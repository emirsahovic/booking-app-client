import {
    CREATE_RESERVATION_REQUEST,
    CREATE_RESERVATION_FAIL,
    CREATE_RESERVATION_SUCCESS,
    RESET_RES
} from "../constants/reservationConstants";


import reservationService from "../../services/reservationService";

export const createReservation = (reservationData, accId) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_RESERVATION_REQUEST })

        const data = await reservationService.createReservation(reservationData, accId);

        dispatch({
            type: CREATE_RESERVATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_RESERVATION_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const resetRes = () => async (dispatch) => {
    dispatch({ type: RESET_RES });
}
