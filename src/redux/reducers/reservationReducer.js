import {
    CREATE_RESERVATION_REQUEST,
    CREATE_RESERVATION_FAIL,
    CREATE_RESERVATION_SUCCESS,
    RESET_RES
} from "../constants/reservationConstants";

const initialState = {
    reservations: [],
    reservation: {},
    isLoadingRes: false,
    isSuccessRes: false,
    isErrorRes: false,
    message: ''
}

export const reservationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RESERVATION_REQUEST:
            return { ...state, isLoadingRes: true }
        case CREATE_RESERVATION_SUCCESS:
            return { ...state, isSuccessRes: true, isErrorRes: false, isLoadingRes: false, reservations: [...state.reservations, action.payload] }
        case CREATE_RESERVATION_FAIL:
            return { ...state, isLoadingRes: false, isSuccessRes: false, isError: true, message: action.payload }
        case RESET_RES:
            return { ...state, isLoadingRes: false, isSuccessRes: false, isErrorRes: false }
        default:
            return state
    }
}
