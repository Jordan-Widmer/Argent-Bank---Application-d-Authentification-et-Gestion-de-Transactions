import {fetchApi} from "../fetchApi.js";
import {retrieveToken} from "../retrieveToken.js";

export const fetchUserProfile = async () => {
    const token = retrieveToken();
    if (!token) {
        return;
    }
    const params = {headers: {Authorization: `Bearer ${token}`}};
    const url = "/user/profile";
    const {body} = await fetchApi({url, params});
    return body;
};

export const loginUser = async (credentials) => {
    if (!credentials) {
        return;
    }
    const body = JSON.stringify(credentials);
    const url = "/user/login";
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    };
    return await fetchApi({url, params});
};

export const updateUserProfile = (profile) => {
    if (!profile) {
        return;
    }
    const token = retrieveToken();
    if (!token) {
        return;
    }

    const body = JSON.stringify(profile);
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body
    };
    const url = "/user/edit-profile";
    return fetchApi({url, params});
};
