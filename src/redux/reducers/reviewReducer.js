import {
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_SUCCESS,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL
} from "../constants/reviewConstants";

const initialState = {
    reviews: [],
    review: {},
    isLoadingRew: false,
    isSuccessRew: false,
    isErrorRew: false,
    message: ''
}

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REVIEW_REQUEST:
        case GET_REVIEWS_REQUEST:
            return { ...state, isLoadingRew: true }
        case CREATE_REVIEW_SUCCESS:
            return { ...state, isSuccessRew: true, isErrorRew: false, isLoadingRew: false, reviews: [action.payload, ...state.reviews] }
        case GET_REVIEWS_SUCCESS:
            return { ...state, isSuccessRew: true, isErrorRew: false, isLoadingRew: false, reviews: action.payload }
        case CREATE_REVIEW_FAIL:
        case GET_REVIEWS_FAIL:
            return { ...state, isLoadingRew: false, isSuccessRew: false, isError: true, message: action.payload }
        default:
            return state
    }
}
