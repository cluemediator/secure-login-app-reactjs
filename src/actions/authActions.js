import {
  VERIFY_TOKEN_STARTED, VERIFY_USER_SUCCESS, VERIFY_TOKEN_END,
  USER_LOGIN_STARTED, USER_LOGIN_FAILURE, USER_LOGOUT
} from "./actionTypes";
import { setAuthToken } from "../services/auth";

// verify token - start
export const verifyTokenStarted = (silentAuth = false) => {
  return {
    type: VERIFY_TOKEN_STARTED,
    payload: {
      silentAuth
    }
  }
}

// verify token - end/failure
export const verifyTokenEnd = () => {
  return {
    type: VERIFY_TOKEN_END
  }
}

// user login - start
export const userLoginStarted = () => {
  return {
    type: USER_LOGIN_STARTED
  }
}

// user login - failure
export const userLoginFailure = (error = 'Something went wrong. Please try again later.') => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: {
      error
    }
  }
}

// verify token - success
export const verifyUserSuccess = ({ token, expiredAt, user }) => {
  return {
    type: VERIFY_USER_SUCCESS,
    payload: {
      token,
      expiredAt,
      user
    }
  }
}

// handle user logout
export const userLogout = () => {
  setAuthToken();
  return {
    type: USER_LOGOUT
  }
}