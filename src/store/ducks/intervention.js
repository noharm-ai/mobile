import { get } from "../../services/api";

// types

export const Types = {
  LOADING: "intervention/LOADING",
  SUCCESS: "intervention/SUCCESS"
};

// reducer
const INITIAL_STATE = {
  loading: true,
  interventionReasons: [],
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
        interventionReasons: action.payload.data
      };
    default:
      return state;
  }
}

// actions

export function requestInterventionReasons() {
  return async dispatch => {
    dispatch({
      type: Types.LOADING
    });

    const response = await get("intervention/reasons", {}, false);
    if (response.status === "success") {
      dispatch({
        type: Types.SUCCESS,
        payload: {
          data: response.data
        }
      });
    } else {
      console.log("error fetching intervention reasons");
    }
  };
}
