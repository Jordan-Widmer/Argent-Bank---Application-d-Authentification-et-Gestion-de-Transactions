export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const logIn = () => {
    return {
        type: 'LOG_IN',
    };
};

export const logout = () => ({
    type: LOGOUT
});

export const updateProfile = (newProfile) => ({
    type: UPDATE_PROFILE,
    payload: newProfile
});
