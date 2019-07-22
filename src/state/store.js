import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import rootReducer from "./reducer";

const initialState = undefined;
const enhancers = [];
const middleware = [reduxThunk];

if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);
const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
