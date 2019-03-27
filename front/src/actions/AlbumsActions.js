import axios from 'axios';

export const GET_ALBUMS = '[Albums] Get';
export const GET_ALBUMS_SUCCESS = '[Albums] Get Success';
export const GET_ALBUMS_ERROR = '[Albums] Get Error';

// TODO: ROOT_URL вынести в отдельный модуль, так, чтобы он был един для всех AJAX запросов.
const ROOT_URL = '/api';

export function getAlbums(query, {clearData}) {
    let params = {
        limit: query.limit,
        offset: query.offset,
    };
    if ('filter' in  query) {
        params.filter = query.filter;
    }
    const promise = axios({
        method: 'get',
        url: `${ROOT_URL}/albums`,
        params,
    });

    return {
        type: GET_ALBUMS,
        payload: { promise, params, clearData }
    };
}

export function getAlbumsSuccess(response) {
    return {
        type: GET_ALBUMS_SUCCESS,
        payload: response,
    };
}

export function getAlbumsError(error) {
    return {
        type: GET_ALBUMS_ERROR,
        payload: error,
    };
}
