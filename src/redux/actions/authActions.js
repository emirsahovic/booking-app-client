import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET,
} from "../constants/authConstants";
import authService from '../../services/authService';

export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const data = await authService.loginUser(userData);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const logout = () => async (dispatch) => {
    await authService.logout();
    dispatch({ type: LOGOUT_SUCCESS });
}

export const reset = () => async (dispatch) => {
    dispatch({ type: RESET });
}

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST })

        await authService.registerUser(userData);

        dispatch({
            type: REGISTER_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}
