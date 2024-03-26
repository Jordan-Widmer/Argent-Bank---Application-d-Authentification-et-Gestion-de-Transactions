import { LOGIN, LOGOUT, UPDATE_PROFILE } from './actions';

const initialState = {
    isLoggedIn: false,
    userProfile: null,
    token: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userProfile: null,
                token: null,
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                userProfile: { ...action.payload },
            };
        default:
            return state;
    }
};

export default reducer;
