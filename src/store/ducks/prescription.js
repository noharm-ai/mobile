import { get } from "../../services/api";

// types

export const Types = {
  LOADING: "prescription/LOADING",
  SUCCESS: "prescription/SUCCESS"
};

// reducer

const INITIAL_STATE = {
  patient: null,
  loading: true,
  error: false
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOADING:
      return {
        ...state,
        loading: true
      };
    case Types.SUCCESS:
      return {
        ...state,
        loading: false,
        patient: action.payload.data
      };
    default:
      return state;
  }
}

// actions

export function requestPrescription(idPrescription) {
  return async dispatch => {
    dispatch({
      type: Types.LOADING
    });

    const response = await get("prescription/" + idPrescription, {}, false);
    if (response.status === "success") {
      dispatch({
        type: Types.SUCCESS,
        payload: {
          data: response.data
        }
      });
    } else {
      console.log("error fetching prescription");
    }
  };
}
