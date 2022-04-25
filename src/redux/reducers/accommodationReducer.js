import {
    GET_ACCOMMODATIONS_REQUEST,
    GET_ACCOMMODATIONS_SUCCESS,
    GET_ACCOMMODATIONS_FAIL,
    GET_ACCOMMODATION_REQUEST,
    GET_ACCOMMODATION_SUCCESS,
    GET_ACCOMMODATION_FAIL,
    CREATE_ACCOMMODATION_REQUEST,
    CREATE_ACCOMMODATION_SUCCESS,
    CREATE_ACCOMMODATION_FAIL
} from "../constants/accommodationConstants"

const initialState = {
    accommodations: [],
    accommodation: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const accommodationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOMMODATIONS_REQUEST:
        case GET_ACCOMMODATION_REQUEST:
        case CREATE_ACCOMMODATION_REQUEST:
            return { ...state, isLoading: true }
        case GET_ACCOMMODATIONS_SUCCESS:
            return { ...state, isLoading: false, isSuccess: true, accommodations: action.payload }
        case GET_ACCOMMODATION_SUCCESS:
            return { ...state, isLoading: false, isSuccess: true, accommodation: action.payload }
        case CREATE_ACCOMMODATION_SUCCESS:
            return { ...state, accommodations: [...state.accommodations, action.payload] }
        case GET_ACCOMMODATIONS_FAIL:
        case GET_ACCOMMODATION_FAIL:
        case CREATE_ACCOMMODATION_FAIL:
            return { ...state, isLoading: false, isSuccess: false, isError: true, message: action.payload }
        default:
            return state
    }
}
