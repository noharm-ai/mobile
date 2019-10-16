import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

import patient from "./ducks/patient";
import prescription from "./ducks/prescription";
import intervention from "./ducks/intervention";

const store = createStore(
  combineReducers({
    patient,
    prescription,
    intervention,
    form: formReducer
  }),
  applyMiddleware(thunk)
);

export default store;
