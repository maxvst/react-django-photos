import axios from 'axios';

export const GET_BASE = '[Base] Get';
export const GET_BASE_SUCCESS = '[Base] Get Success';
export const GET_BASE_ERROR = '[Base] Get Error';

// TODO: ROOT_URL вынести в отдельный модуль, так, чтобы он был един для всех AJAX запросов.
const ROOT_URL = '/api';

export function getBase(query) {
    let params = {
        limit: query.limit,
        offset: query.offset,
    };
    if ('filter' in  query) {
        params.filter = query.filter;
    }
    const baseId = query.baseId;
    const promise = axios({
        method: 'get',
        url: `${ROOT_URL}/base/${baseId}`,
        params,
    });

    return {
        type: GET_BASE,
        payload: { promise, params }
    };
}

export function getBaseSuccess(response) {
    return {
        type: GET_BASE_SUCCESS,
        payload: response,
    };
}

export function getBaseError(error) {
    return {
        type: GET_BASE_ERROR,
        payload: error,
    };
}
