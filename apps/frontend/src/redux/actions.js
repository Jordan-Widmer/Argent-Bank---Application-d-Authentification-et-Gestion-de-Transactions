export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const logIn = (token) => {
    return {
        type: 'LOG_IN',
        payload: token,
    };
};

export const logout = () => ({
    type: LOGOUT
});

export const updateProfile = (newProfile) => ({
    type: UPDATE_PROFILE,
    payload: newProfile
});
