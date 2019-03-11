import { GET_IMAGE_LIST, GET_IMAGE_LIST_SUCCESS, GET_IMAGE_LIST_ERROR } from '../actions/ImageListActions';

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
        case GET_IMAGE_LIST:
            return { ...state, loading: true, request: action.payload }; 
        case GET_IMAGE_LIST_SUCCESS:
            const response = action.payload;
            response.result = response.result.map(
                album => ({ ...album, url: `/api/images/${album.id}/preview`})
            );
            return { ...state, loading: false, response: action.payload, error: null };
        case GET_IMAGE_LIST_ERROR:
            return { ...state, loading: false, error: action.payload, response: INITIAL_RESPONSE };

        default:
            return state;
    }
}
