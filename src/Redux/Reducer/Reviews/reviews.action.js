import axios from "axios";

// Redux Reducer Types
import { GET_REVIEWS, POST_REVIEWS } from "./reviews.type";

import { API_URL } from "../../../key";

export const getReviews = (resId) => async (dispatch) => {
  try {
    const reviewList = await axios({
      method: "GET",
      url: `${API_URL}/review/${resId}`,
    });

    return dispatch({ type: GET_REVIEWS, payload: reviewList.data });
  } catch (error) {
    return console.log(error);
  }
};

export const postReviews = (reviewData) => async (dispatch) => {
  try {
    await axios({
      method: "POST",
      url: `${API_URL}/review/new`,
      data: { reviewData },
    });

    return dispatch({
      type: POST_REVIEWS,
      payload: reviewData,
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
