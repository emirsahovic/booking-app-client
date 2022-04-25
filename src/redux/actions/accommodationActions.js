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
} from "../constants/accommodationConstants";
import accommodationService from '../../services/accommodationService';

export const getAccommodations = (city = '', type = '', name = '') => async (dispatch) => {
    try {
        dispatch({ type: GET_ACCOMMODATIONS_REQUEST })

        const data = await accommodationService.getAccommodations(city, type, name);

        dispatch({
            type: GET_ACCOMMODATIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ACCOMMODATIONS_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const getFilteredAccommodations = (typeFil = '') => async (dispatch) => {
    try {
        dispatch({ type: GET_ACCOMMODATIONS_REQUEST })

        const data = await accommodationService.getFilteredAccommodations(typeFil);

        dispatch({
            type: GET_ACCOMMODATIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ACCOMMODATIONS_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const getAccommodationById = (accommodationId) => async (dispatch) => {
    try {
        dispatch({ type: GET_ACCOMMODATION_REQUEST })

        const data = await accommodationService.getAccommodationById(accommodationId);

        dispatch({
            type: GET_ACCOMMODATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ACCOMMODATION_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const createAccommodation = (accommodationData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ACCOMMODATION_REQUEST })

        const data = await accommodationService.createAccommodation(accommodationData);

        dispatch({
            type: CREATE_ACCOMMODATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ACCOMMODATION_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}
