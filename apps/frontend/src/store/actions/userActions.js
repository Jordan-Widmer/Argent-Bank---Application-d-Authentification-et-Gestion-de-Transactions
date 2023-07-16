import {fetchUserProfile} from "../utils/api";

export const userLogin = (credentials) => async (dispatch) => {
    const response = await loginUser(credentials);
    dispatch({
        type: "LOGIN_USER",
        payload: response
    });
};

export const userProfile = (profile) => async (dispatch) => {
    if (!profile) {
        profile = await fetchUserProfile();
    }
    await updateUserProfile(profile);

    dispatch({
        type: "FETCH_USER_PROFILE",
        payload: profile
    });
};
