import { GET_BASES, GET_BASES_SUCCESS, GET_BASES_ERROR } from '../actions/BasesActions';

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
        case GET_BASES:
            return { ...state, loading: true, request: action.payload }; 
        case GET_BASES_SUCCESS:
            return { ...state, loading: false, response: action.payload, error: null };
        case GET_BASES_ERROR:
            return { ...state, loading: false, error: action.payload, response: INITIAL_RESPONSE };

        default:
            return state;
    }
}
