import { LOGIN, LOGOUT, UPDATE_PROFILE } from './actions';

const initialState = {
    isLoggedIn: false,
    userProfile: null,
    token: null, // nouveau champ pour le token
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userProfile: null,
                token: null, // réinitialise le token ici
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
