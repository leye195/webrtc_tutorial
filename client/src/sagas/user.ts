import { fork, takeLatest, all, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  USER_LOG_IN_SUCCESS,
  USER_LOG_IN_FAILURE,
  USER_LOG_IN_REQUEST,
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  USER_LOG_OUT_REQUEST,
  USER_LOG_OUT_SUCCESS,
  USER_LOG_OUT_FAILURE,
} from "../reducers/user";
const api = axios.create({
  baseURL: "http://localhost:8080",
});

function loginAPI(data: any) {
  return api.post("/login", data, {
    withCredentials: true,
  });
}
function* login(action: any) {
  try {
    const result = yield call(loginAPI, action.payload);
    yield put({
      type: USER_LOG_IN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOG_IN_FAILURE,
      error: e,
    });
  }
}
function* watchLogin() {
  yield takeLatest(USER_LOG_IN_REQUEST, login);
}

function signUpAPI(data: any) {
  return api.post("/register", data);
}
function* signUp(action: any) {
  try {
    const result = yield call(signUpAPI, action.payload);
    yield put({
      type: USER_SIGN_UP_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_SIGN_UP_FAILURE,
      error: e,
    });
  }
}
function* watchSignUp() {
  yield takeLatest(USER_SIGN_UP_REQUEST, signUp);
}
function authAPI() {
  return api.get("/auth", {
    withCredentials: true,
  });
}
function* auth() {
  try {
    const result = yield call(authAPI);
    yield put({
      type: AUTH_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: AUTH_FAILURE,
      error: e,
    });
  }
}
function* watchAuth() {
  yield takeLatest(AUTH_REQUEST, auth);
}

function logoutAPI() {
  return api.post(
    "/logout",
    {},
    {
      withCredentials: true,
    }
  );
}
function* logout() {
  try {
    const result = yield call(logoutAPI);
    console.log(result);
    yield put({
      type: USER_LOG_OUT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOG_OUT_FAILURE,
      error: e,
    });
  }
}
function* watchLogout() {
  yield takeLatest(USER_LOG_OUT_REQUEST, logout);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchAuth),
    fork(watchLogout),
  ]);
}
