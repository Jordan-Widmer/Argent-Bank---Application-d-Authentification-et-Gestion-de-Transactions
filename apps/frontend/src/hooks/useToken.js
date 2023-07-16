/**
 *@todo make a general localStore hook
 */

export const useToken = () => {
    const getToken = (name) => localStorage.getItem(name);
    const setToken = (name, token) => localStorage.setItem(name, token);
    const removeToken = () => localStorage.removeItem(name);
    return {
        getToken,
        setToken,
        removeToken
    };
};
