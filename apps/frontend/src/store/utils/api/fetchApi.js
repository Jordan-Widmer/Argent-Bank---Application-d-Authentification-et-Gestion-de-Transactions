import {baseUrl} from "./baseUrl.js";

export const fetchApi = async ({url, params}) => {
    if (!url) {
        return;
    }
    if (!params) {
        return;
    }
    const requestedUrl = `${baseUrl}${url}`;
    const response = await fetch(requestedUrl, params).catch((err) => new Error(err));
    return await response.json();
};
