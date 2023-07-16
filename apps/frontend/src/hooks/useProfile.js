import {useSelector} from "react-redux";
import {userProfile} from "../store/actions/userActions.js";
export const useProfile = () => {
    /**
     * @return  user profile from the redux global state
     */
    const get = () => useSelector((state) => state.profile);
    /**
     * @param {undefined | object<profile>} profile
     *  call the action userProfile to set in the user profile in the gobal redux state
     */
    const set = (profile) => userProfile(profile);
    return {
        get,
        set
    };
};
