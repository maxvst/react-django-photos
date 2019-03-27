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
            return { 
                ...state, 
                loading: true, 
                request: action.payload,
                response: (action.payload.clearData) ? INITIAL_RESPONSE : state.response
            }; 
        case GET_ALBUMS_SUCCESS:
            const response = action.payload;
            response.result = response.result.map(
                album => ({ ...album, url: `/api/albums/${album.id}/preview`})
            );
            return { ...state, loading: false, response: response, error: null };
        case GET_ALBUMS_ERROR:
            return { ...state, loading: false, error: action.payload, response: INITIAL_RESPONSE };

        default:
            return state;
    }
}
