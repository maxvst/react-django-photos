import axios from 'axios';

export const GET_ALBUM = '[Album] Get';
export const GET_ALBUM_SUCCESS = '[Album] Get Success';
export const GET_ALBUM_ERROR = '[Album] Get Error';

// TODO: ROOT_URL вынести в отдельный модуль, так, чтобы он был един для всех AJAX запросов.
const ROOT_URL = '/api';

export function getAlbum(query) {
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
        url: `${ROOT_URL}/albums/${albumId}/info`,
        params,
    });

    return {
        type: GET_ALBUM,
        payload: { promise, params }
    };
}

export function getAlbumSuccess(response) {
    return {
        type: GET_ALBUM_SUCCESS,
        payload: response,
    };
}

export function getAlbumError(error) {
    return {
        type: GET_ALBUM_ERROR,
        payload: error,
    };
}

