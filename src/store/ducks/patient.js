import { get } from "../../services/api";

// types

export const Types = {
  UPDATE_SEARCH_TEXT: "patient/UPDATE_SEARCH_TEXT",
  UPDATE_SEARCH_ORDER: "patient/UPDATE_SEARCH_ORDER",
  UPDATE_SEARCH_SEGMENT: "patient/UPDATE_SEARCH_SEGMENT",
  LOADING_PATIENTS: "patient/LOADING_PATIENTS",
  SUCCESS_PATIENTS: "patient/SUCCESS_PATIENTS",
  LOADING_SEGMENTS: "patient/LOADING_SEGMENTS",
  SUCCESS_SEGMENTS: "patient/SUCCESS_SEGMENTS"
};

// reducer
const INITIAL_STATE = {
  patients: [],
  loading: true,
  error: false,
  activeSegment: "Todos segmentos",
  searchParams: {
    text: null,
    order: "score",
    direction: "desc",
    idSegment: null
  },
  loadingSegments: false,
  segments: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.UPDATE_SEARCH_TEXT:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          text: action.payload.text
        }
      };
    case Types.UPDATE_SEARCH_ORDER:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          order: action.payload.field,
          direction: action.payload.direction
        }
      };
    case Types.UPDATE_SEARCH_SEGMENT:
      return {
        ...state,
        activeSegment: action.payload.description,
        searchParams: {
          ...state.searchParams,
          idSegment: action.payload.idSegment
        }
      };
    case Types.LOADING_PATIENTS:
      return {
        ...state,
        loading: true
      };
    case Types.SUCCESS_PATIENTS:
      return {
        ...state,
        loading: false,
        patients: action.payload.data
      };
    case Types.LOADING_PATIENTS:
      return {
        ...state,
        loading: true
      };
    case Types.SUCCESS_PATIENTS:
      return {
        ...state,
        loading: false,
        patients: action.payload.data
      };
    case Types.LOADING_SEGMENTS:
      return {
        ...state,
        loadingSegments: true
      };
    case Types.SUCCESS_SEGMENTS:
      return {
        ...state,
        loadingSegments: false,
        segments: action.payload.data
      };
    default:
      return state;
  }
}

// actions

export function updateSearchText(text) {
  return {
    type: Types.UPDATE_SEARCH_TEXT,
    payload: {
      text
    }
  };
}

export function updateSearchOrder(field, direction) {
  return {
    type: Types.UPDATE_SEARCH_ORDER,
    payload: {
      field,
      direction
    }
  };
}

export function updateSearchSegment(idSegment, description) {
  return {
    type: Types.UPDATE_SEARCH_SEGMENT,
    payload: {
      idSegment,
      description
    }
  };
}

export function requestPatients(searchParams) {
  return async dispatch => {
    dispatch({
      type: Types.LOADING_PATIENTS
    });

    let params = [];
    params.push("order=" + searchParams.order);
    params.push("direction=" + searchParams.direction);

    if (searchParams.text && searchParams.text !== "") {
      params.push("name=" + searchParams.text);
    }

    if (searchParams.idSegment) {
      params.push("idSegment=" + searchParams.idSegment);
    }

    const response = await get("patients", params, false);

    if (response.status === "success") {
      dispatch({
        type: Types.SUCCESS_PATIENTS,
        payload: {
          data: response.data
        }
      });
    } else {
      console.log("error fetching patients");
    }
  };
}

export function requestSegments() {
  return async dispatch => {
    dispatch({
      type: Types.LOADING_SEGMENTS
    });

    const response = await get("segments", {}, false);
    if (response.status === "success") {
      dispatch({
        type: Types.SUCCESS_SEGMENTS,
        payload: {
          data: response.data
        }
      });
    } else {
      console.log("error fetching segments");
    }
  };
}
