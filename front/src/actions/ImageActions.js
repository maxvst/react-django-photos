import axios from 'axios';

export const GET_IMAGE = '[Image] Get';
export const GET_IMAGE_SUCCESS = '[Image] Get Success';
export const GET_IMAGE_ERROR = '[Image] Get Error';

// TODO: ROOT_URL вынести в отдельный модуль, так, чтобы он был един для всех AJAX запросов.
const ROOT_URL = '/api';

export function getImage({imageId}) {
    const promise = axios({
        method: 'get',
        url: `${ROOT_URL}/images/${imageId}?target=description`,
    });

    return {
        type: GET_IMAGE,
        payload: { promise, imageId },
    };
}

export function getImageSuccess(response) {
    return {
        type: GET_IMAGE_SUCCESS,
        payload: response,
    };
}

export function getImageError(error) {
    return {
        type: GET_IMAGE_ERROR,
        payload: error,
    };
}
