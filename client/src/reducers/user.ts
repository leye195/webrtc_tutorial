import { createAction, handleActions } from "redux-actions";

const USER_LOG_IN = "USER_LOG_IN";
const USER_SIGN_UP = "USER_SIGN_UO";
const USER_LOG_OUT = "USER_LOG_OUT";

export const userLogIn = createAction(USER_LOG_IN);
export const userSignUp = createAction(USER_SIGN_UP);
export const userLogOut = createAction(USER_LOG_OUT);

type userActionType =
  | ReturnType<typeof userLogIn>
  | ReturnType<typeof userSignUp>
  | ReturnType<typeof userLogOut>;
type initStateType = {
  isLoggedIn: boolean;
  userId: string;
};
const initState: initStateType = {
  isLoggedIn: false,
  userId: "",
};

export default handleActions(
  {
    [USER_LOG_IN]: (state: initStateType, action: userActionType) => {
      const { payload } = action;
      return { ...state, isLoggedIn: true, userId: payload };
    },
    [USER_SIGN_UP]: (state: initStateType, action: userActionType) => {
      const {
        payload: { userId },
      } = action;
      return { ...state, isLoggedIn: true, userId };
    },
    [USER_LOG_OUT]: (state: initStateType, action: userActionType) => {
      return { ...state, isLoggedIn: false, userId: "" };
    },
  },
  initState
);
