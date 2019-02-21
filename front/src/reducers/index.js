import { combineReducers } from "redux";
import baseListReducer from './baseListReducer';
import baseReducer from './baseReducer';
import imageReducer from "./imageReducer";

export default combineReducers({ 
    bases: baseListReducer, 
    base: baseReducer,
    image: imageReducer,
});
