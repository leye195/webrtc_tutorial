import { createAction, handleActions } from "redux-actions";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";

export const USER_LOG_IN_REQUEST = "USER_LOG_IN_REQUEST";
export const USER_LOG_IN_SUCCESS = "USER_LOG_IN_SUCCESS";
export const USER_LOG_IN_FAILURE = "USER_LOG_IN_FAILURE";

export const USER_SIGN_UP_REQUEST = "USER_SIGN_UP_REQUEST";
export const USER_SIGN_UP_SUCCESS = "USER_SIGN_UP_SUCCESS";
export const USER_SIGN_UP_FAILURE = "USER_SIGN_UP_FAILURE";

export const USER_LOG_OUT_REQUEST = "USER_LOG_OUT_REQUEST";
export const USER_LOG_OUT_SUCCESS = "USER_LOG_OUT_SUCCESS";
export const USER_LOG_OUT_FAILURE = "USER_LOG_OUT_FAILURE";

export const userLogIn = createAction(USER_LOG_IN_REQUEST);
export const userSignUp = createAction(USER_SIGN_UP_REQUEST);
export const userLogOut = createAction(USER_LOG_OUT_REQUEST);
export const userAuth = createAction(AUTH_REQUEST);

type userActionType =
  | ReturnType<typeof userLogIn>
  | ReturnType<typeof userSignUp>
  | ReturnType<typeof userLogOut>
  | ReturnType<typeof userAuth>;
type initStateType = {
  isLoggedIn: boolean;
  waitingLogIn: boolean;
  loginError: boolean;
  userId: string;
  waitingSignUp: boolean;
  isSignedUp: boolean;
};
const initState: initStateType = {
  isLoggedIn: false,
  waitingLogIn: false,
  loginError: false,
  userId: "",
  waitingSignUp: false,
  isSignedUp: false,
};

export default handleActions(
  {
    [AUTH_REQUEST]: (state: initStateType, action: userActionType) => {
      return { ...state };
    },
    [AUTH_SUCCESS]: (state: initStateType, action: userActionType) => {
      const { userId } = action.payload;
      return { ...state, userId, isLoggedIn: true };
    },
    [AUTH_FAILURE]: (state: initStateType, action: userActionType) => {
      return { ...state };
    },
    [USER_LOG_IN_REQUEST]: (state: initStateType, action: userActionType) => {
      return { ...state, waitingLogIn: true, loginError: false };
    },
    [USER_LOG_IN_SUCCESS]: (state: initStateType, action: userActionType) => {
      const { payload } = action;
      return {
        ...state,
        isLoggedIn: true,
        userId: payload,
        waitingLogIn: false,
      };
    },
    [USER_LOG_IN_FAILURE]: (state: initStateType, action: userActionType) => {
      return { ...state, waitingLogIn: false, loginError: true };
    },
    [USER_SIGN_UP_REQUEST]: (state: initStateType, action: userActionType) => {
      return { ...state, isSignedUp: false, waitingSignUp: true };
    },
    [USER_SIGN_UP_SUCCESS]: (state: initStateType, action: userActionType) => {
      return { ...state, isSignedUp: true, waitingSignUp: false };
    },
    [USER_SIGN_UP_FAILURE]: (state: initStateType, action: userActionType) => {
      return { ...state, isSignedUp: false, waitingSignUp: false };
    },
    [USER_LOG_OUT_REQUEST]: (state: initStateType, action: userActionType) => {
      return { ...state, isLoggedIn: false, userId: "" };
    },
    [USER_LOG_OUT_SUCCESS]: (state: initStateType, action: userActionType) => {
      return { ...state, isLoggedIn: false, userId: "" };
    },
    [USER_LOG_OUT_FAILURE]: (state: initStateType, action: userActionType) => {
      return { ...state, isLoggedIn: false, userId: "" };
    },
  },
  initState
);
