import { GET_ALBUM, GET_ALBUM_SUCCESS, GET_ALBUM_ERROR } from '../actions/AlbumActions';

const INITIAL_RESPONSE = {
    id: null,
    title: null,
}

const INITIAL_STATE = {
    loading: true,
    request: {
        promise: null,
        params: { }
    },
    response: INITIAL_RESPONSE,
    error: null,
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_ALBUM:
            return { ...state, loading: true, request: action.payload }; 
        case GET_ALBUM_SUCCESS:
            return { ...state, loading: false, response: action.payload, error: null };
        case GET_ALBUM_ERROR:
            return { ...state, loading: false, error: action.payload, response: INITIAL_RESPONSE };

        default:
            return state;
    }
}
