const initialState = {
    profile: null,
    token: null,
    isLogged: false
};

const isLoggedin = (response) => {
    const {
        status,
        body: {token}
    } = response;
    if (status != 200 || !body || !token) {
        return false;
    }
    return true;
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_USER_PROFILE":
            return {
                ...state,
                profile: action.payload
            };
        case "LOGIN_USER":
            const {token} = action.payload;
            const isLogged = isLoggedin(action.payload);
            return {
                ...state,
                token,
                isLogged
            };
        default:
            return state;
    }
};
