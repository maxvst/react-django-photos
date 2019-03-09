import { GET_ALBUMS, GET_ALBUMS_SUCCESS, GET_ALBUMS_ERROR } from '../actions/AlbumsActions';

const INITIAL_RESPONSE = {
    result: [],
    total: 0,
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
        case GET_ALBUMS:
            return { ...state, loading: true, request: action.payload }; 
        case GET_ALBUMS_SUCCESS:
            return { ...state, loading: false, response: action.payload, error: null };
        case GET_ALBUMS_ERROR:
            return { ...state, loading: false, error: action.payload, response: INITIAL_RESPONSE };

        default:
            return state;
    }
}
