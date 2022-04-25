import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/authReducer';
import { accommodationReducer } from './reducers/accommodationReducer';
import { reservationReducer } from './reducers/reservationReducer';
import { reviewReducer } from './reducers/reviewReducer';

const reducer = combineReducers({
    auth: authReducer,
    accommodation: accommodationReducer,
    reservation: reservationReducer,
    review: reviewReducer
})

const initialState = {}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
