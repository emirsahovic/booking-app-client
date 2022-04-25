import apiService from './httpService';

const getAccommodations = async (city = '', type = '', name = '') => {
    if (city !== '') {
        const { data } = await apiService.get(`/accommodations?search=${city}`);
        return data;
    }

    if (type !== '') {
        const { data } = await apiService.get(`/accommodations?search=${type}`);
        return data;
    }

    if (name !== '') {
        const { data } = await apiService.get(`/accommodations?search=${name}`);
        return data;
    }

    const { data } = await apiService.get('/accommodations');
    return data;
}

const getFilteredAccommodations = async (typeFil = '') => {
    if (typeFil !== '') {
        const { data } = await apiService.get(`/accommodations?type=${typeFil}`);
        return data;
    } else {
        const { data } = await apiService.get('/accommodations');
        return data;
    }

}

const getAccommodationById = async (accommodationId) => {
    const { data } = await apiService.get(`/accommodations/${accommodationId}`);

    return data;
}

const createAccommodation = async (accommodationData) => {
    const { data } = await apiService.post('/accommodations', accommodationData);

    return data;
}

const accommodationService = {
    getAccommodations,
    getFilteredAccommodations,
    getAccommodationById,
    createAccommodation
}

export default accommodationService;
