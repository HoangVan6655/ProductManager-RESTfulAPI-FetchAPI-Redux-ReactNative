import { productReducer } from "./productReducer";

import { createStore, combineReducers } from "redux";

export const rootReducer = combineReducers({
    products: productReducer
});

