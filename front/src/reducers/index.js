import { combineReducers } from "redux";
import baseListReducer from './baseListReducer';
import baseReducer from './baseReducer';
import imageReducer from "./imageReducer";
import ImageListReducer from "./ImageListReducer";

export default combineReducers({ 
    baseList: baseListReducer, 
    base: baseReducer,
    image: imageReducer,
    imageList: ImageListReducer
});
