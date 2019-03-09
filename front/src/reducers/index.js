import { combineReducers } from "redux";
import albumListReducer from './albumListReducer';
import albumReducer from './albumReducer';
import imageReducer from "./imageReducer";
import ImageListReducer from "./ImageListReducer";

export default combineReducers({ 
    albumList: albumListReducer, 
    album: albumReducer,
    image: imageReducer,
    imageList: ImageListReducer
});
