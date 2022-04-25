import apiService from './httpService';

const createReview = async (reviewData, accId) => {
    const { data } = await apiService.post(`/reviews?accId=${accId}`, reviewData);

    return data;
}

const getReviews = async () => {
    const { data } = await apiService.get('/reviews');

    return data;
}

const reviewService = {
    createReview,
    getReviews
}

export default reviewService;
