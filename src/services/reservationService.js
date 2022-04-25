import apiService from './httpService';

const createReservation = async (reservationData, accId) => {
    const { data } = await apiService.post(`/reservations?accommodationId=${accId}`, reservationData);

    return data;
}

const reservationService = {
    createReservation
}

export default reservationService;
