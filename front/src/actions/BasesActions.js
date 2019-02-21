import axios from 'axios';

export const GET_BASES = '[Bases] Get';
export const GET_BASES_SUCCESS = '[Bases] Get Success';
export const GET_BASES_ERROR = '[Bases] Get Error';

// TODO: ROOT_URL вынести в отдельный модуль, так, чтобы он был един для всех AJAX запросов.
const ROOT_URL = '/api';

export function getBases(query) {
    let params = {
        limit: query.limit,
        offset: query.offset,
    };
    if ('filter' in  query) {
        params.filter = query.filter;
    }
    const promise = axios({
        method: 'get',
        url: `${ROOT_URL}/base`,
        params,
    });

    return {
        type: GET_BASES,
        payload: { promise, params }
    };
}

export function getBasesSuccess(response) {
    return {
        type: GET_BASES_SUCCESS,
        payload: response,
    };
}

export function getBasesError(error) {
    return {
        type: GET_BASES_ERROR,
        payload: error,
    };
}
