import axios from "axios";

// Redux Types
import { SIGN_IN, SIGN_OUT, SIGN_UP, GOOGLE_AUTH } from "./auth.type";

// redux actions
import { getMySelf, clearUser } from "../User/user.action";

import { API_URL, CLIENT_URL } from "../../../key";

export const signIn = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "POST",
      url: `${API_URL}/auth/signin`,
      data: { credentials: userData },
    });

    getMySelf();

    localStorage.setItem(
      "zomatoUser",
      JSON.stringify({ token: User.data.token })
    );

    return dispatch({ type: SIGN_IN, payload: User.data });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error });
  }
};

export const signUp = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "POST",
      url: `${API_URL}/auth/signup`,
      data: { credentials: userData },
    });

    window.location.href = `${CLIENT_URL}/delivery`;

    localStorage.setItem(
      "zomatoUser",
      JSON.stringify({ token: User.data.token })
    );

    return dispatch({ type: SIGN_UP, payload: User.data });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error });
  }
};

export const googleAuth = (token) => async (dispatch) => {
  try {
    localStorage.setItem("zomatoUser", JSON.stringify({ token }));

    dispatch({ type: GOOGLE_AUTH, payload: {} });

    window.location.href = `${CLIENT_URL}/delivery`;
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    localStorage.removeItem("zomatoUser");
    clearUser();
    window.location.href = `${CLIENT_URL}/delivery`;

    return dispatch({ type: SIGN_OUT, payload: {} });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error });
  }
};
