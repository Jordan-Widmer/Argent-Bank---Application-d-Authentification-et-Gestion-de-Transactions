import { LOGIN, LOGOUT, UPDATE_PROFILE } from './actions';

const initialState = {
    isLoggedIn: false,
    userProfile: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                userProfile: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userProfile: null,
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                userProfile: { ...state.userProfile, ...action.payload },
            };
        default:
            return state;
    }
};

export default reducer;
