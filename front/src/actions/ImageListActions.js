import axios from 'axios';

export const GET_IMAGE_LIST = '[Image List] Get';
export const GET_IMAGE_LIST_SUCCESS = '[Image List] Get Success';
export const GET_IMAGE_LIST_ERROR = '[Image List] Get Error';

// TODO: ROOT_URL вынести в отдельный модуль, так, чтобы он был един для всех AJAX запросов.
const ROOT_URL = '/api';

export function getImageList(query) {
    let params = {
        limit: query.limit,
        offset: query.offset,
    };
    if ('filter' in  query) {
        params.filter = query.filter;
    }
    const albumId = query.albumId;
    const promise = axios({
        method: 'get',
        url: `${ROOT_URL}/images/?album=${albumId}`,
        params,
    });

    return {
        type: GET_IMAGE_LIST,
        payload: { promise, params }
    };
}

export function getImageListSuccess(response) {
    return {
        type: GET_IMAGE_LIST_SUCCESS,
        payload: response,
    };
}

export function getImageListError(error) {
    return {
        type: GET_IMAGE_LIST_ERROR,
        payload: error,
    };
}

