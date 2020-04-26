import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user
  };
};
export const logout = () => {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);

    dispatch(setCurrentUser({}));
  };
};
export const authUser = (type, userData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          setAuthorizationToken(token);
          localStorage.setItem("jwtToken", token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          dispatch(addError(err.message));
        });
    });
  };
};
export function setAuthorizationToken(token) {
  setTokenHeader(token);
}
