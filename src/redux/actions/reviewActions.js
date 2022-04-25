import {
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_SUCCESS,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL
} from "../constants/reviewConstants";

import reviewService from "../../services/reviewService";

export const createReview = (reviewData, accId) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_REVIEW_REQUEST })

        const data = await reviewService.createReview(reviewData, accId);

        dispatch({
            type: CREATE_REVIEW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_REVIEW_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const getReviews = () => async (dispatch) => {
    try {
        dispatch({ type: GET_REVIEWS_REQUEST })

        const data = await reviewService.getReviews();

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}