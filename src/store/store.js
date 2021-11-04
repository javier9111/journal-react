import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/aurhReducer";
import { notesReducer } from "../reducers/notesReducer";
import { uiReducer } from "../reducers/uiReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/**this fuinction allows to have multiple reducers, why do we need this?
 * since the application might grow and the "createStore" only receives one reducers
 * should be good to have multiple combine to avoid refactorization.
 */
const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer,
});

/**we add the thunk middleware here to be able to mange asyc fuction, request and be able to avoid data issues */
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
