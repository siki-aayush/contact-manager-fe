import { LocalStorageKeys } from "../enum/localStorageKeys.enum";

/**
 * addUserLoginToLocalStorage.
 * Adds whether the user is logged in or not to the local storage
 * @param {string} isLoggedIn
 */
export const addUserLoginToLocalStorage = (
  isLoggedIn: string,
  accessToken: string,
  refreshToken: string,
  userId: string
) => {
  localStorage.setItem(LocalStorageKeys.IS_LOGGED_IN, isLoggedIn);
  localStorage.setItem(LocalStorageKeys.accessToken, accessToken);
  localStorage.setItem(LocalStorageKeys.refreshToken, refreshToken);
  localStorage.setItem(LocalStorageKeys.userId, userId);
};

/**
 * Gets the token from the local storage
 */
export const getUserTokensFromLocalStorage = () => {
  return {
    accessToken: localStorage.getItem(LocalStorageKeys.accessToken),
    refreshToken: localStorage.getItem(LocalStorageKeys.refreshToken),
  };
};

/**
 * Gets the user id from the local storage
 */
export const getUserIdFromLocalStorage = () => {
  return localStorage.getItem(LocalStorageKeys.userId);
};

/**
 * isUserLoggedIn.
 * Checks whether the user is logged in or not
 * @returns {boolean}
 */
export const getUserLoginFromLocalStorage = (): boolean => {
  const loggedInStatus = localStorage.getItem(LocalStorageKeys.IS_LOGGED_IN);
  if (loggedInStatus === null) {
    return false;
  } else {
    return JSON.parse(loggedInStatus);
  }
};

/**
 * clearUserLoginFromLocalStorage.
 * Clears the user logged in value from the local storage
 */
export const clearUserLoginFromLocalStorage = () => {
  localStorage.removeItem(LocalStorageKeys.IS_LOGGED_IN);
  localStorage.removeItem(LocalStorageKeys.accessToken);
  localStorage.removeItem(LocalStorageKeys.refreshToken);
};
