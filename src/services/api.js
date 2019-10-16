import { AsyncStorage } from "react-native";
import NavigationService from "./NavigationService";
import Config from "../constants/Config";

const API_ROOT = Config.API_ROOT;

export async function get(path, params, suppressRedBox) {
  if (params && params.length > 0) {
    path += "?" + params.join("&");
  }
  return bodyOf(request("get", path, null, suppressRedBox));
}

export async function post(path, body, suppressRedBox) {
  return bodyOf(request("POST", path, body, suppressRedBox));
}

export async function request(method, path, body, suppressRedBox) {
  try {
    const response = await sendRequest(method, path, body, suppressRedBox);
    return handleResponse(path, response);
  } catch (error) {
    if (!suppressRedBox) {
      logError(error, url(path), method);
    }
    throw error;
  }
}

export function url(path) {
  const apiRoot = API_ROOT;
  return path.indexOf("/") === 0 ? apiRoot + path : apiRoot + "/" + path;
}

async function sendRequest(method, path, body) {
  try {
    const endpoint = url(path);
    const authData = await AsyncStorage.getItem("authData");
    const headers = getRequestHeaders(body, authData);
    const options = body
      ? { method, headers, body: JSON.stringify(body) }
      : { method, headers };

    if (path !== "authenticate") {
      return refreshToken(fetch(endpoint, options), endpoint, options);
    }

    return fetch(endpoint, options);
  } catch (e) {
    throw new Error(e);
  }
}

async function handleResponse(path, response) {
  try {
    const status = response.status;

    if (status === 401) {
      await AsyncStorage.clear();
      NavigationService.navigate("Auth");
    }

    if (status >= 400) {
      const errorBody = await getErrorMessageSafely(response);
      return {
        status: response.status,
        headers: response.headers,
        body: errorBody
      };
    }

    const responseBody = await response.text();
    return {
      status: response.status,
      headers: response.headers,
      body: responseBody ? JSON.parse(responseBody) : null
    };
  } catch (e) {
    throw e;
  }
}

function getRequestHeaders(body, authData) {
  const headers = body
    ? { Accept: "application/json", "Content-Type": "application/json" }
    : { Accept: "application/json" };

  if (authData) {
    const auth = JSON.parse(authData);
    return { ...headers, Authorization: "Bearer " + auth.access_token };
  }

  return headers;
}

async function getErrorMessageSafely(response) {
  try {
    const body = await response.text();
    if (!body) {
      return "";
    }

    const payload = JSON.parse(body);
    if (payload) {
      return payload;
    }

    return body;
  } catch (e) {
    return response._bodyInit;
  }
}

function refreshToken(promise, endpoint, options) {
  return new Promise((resolve, reject) => {
    promise
      .then(async response => {
        if (response.status === 401) {
          const authData = await AsyncStorage.getItem("authData");
          const auth = JSON.parse(authData);

          const refreshResponse = await fetch(url("refresh-token"), {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + auth.refresh_token
            }
          });

          if (refreshResponse.status === 401) {
            // expired token
            resolve(response);
          } else {
            // resolve original request
            const refresh = await refreshResponse.json();

            auth.access_token = refresh.access_token;
            await AsyncStorage.setItem("authData", JSON.stringify(auth));
            options.headers["Authorization"] = "Bearer " + refresh.access_token;

            const originalResponse = await fetch(endpoint, options);
            resolve(originalResponse);
          }
        } else {
          resolve(response);
        }
      })
      .catch(reject);
  });
}

async function bodyOf(requestPromise) {
  try {
    const response = await requestPromise;
    return response.body;
  } catch (e) {
    throw e;
  }
}

function logError(error, endpoint, method) {
  if (error.status) {
    const summary = `(${error.status} ${error.statusText}): ${error._bodyInit}`;
    console.error(
      `API request ${method.toUpperCase()} ${endpoint} responded with ${summary}`
    );
  } else {
    console.error(
      `API request ${method.toUpperCase()} ${endpoint} failed with message "${
        error.message
      }"`
    );
  }
}
