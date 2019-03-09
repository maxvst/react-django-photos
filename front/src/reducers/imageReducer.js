import { GET_IMAGE, GET_IMAGE_SUCCESS, GET_IMAGE_ERROR } from '../actions/ImageActions';

const INITIAL_RESPONSE = {
    id: null,
    album: null,
    title: null,
    image: null
}

const INITIAL_STATE = {
    loading: true,
    request: {
        imageId: null
    },
    response: INITIAL_RESPONSE,
    error: null,
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_IMAGE:
            return { ...state, loading: true, request: action.payload }; 
        case GET_IMAGE_SUCCESS:
            return { ...state, loading: false, response: action.payload, error: null };
        case GET_IMAGE_ERROR:
            return { ...state, loading: false, error: action.payload, response: INITIAL_RESPONSE };

        default:
            return state;
    }
}
