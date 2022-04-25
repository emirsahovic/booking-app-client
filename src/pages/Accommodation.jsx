import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { getAccommodationById } from '../redux/actions/accommodationActions';
import { createReview, getReviews } from '../redux/actions/reviewActions';

import Spinner from '../components/Spinner';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import ReactStars from "react-rating-stars-component";
import * as Yup from 'yup';

import { Typography, Container, Box, Select, MenuItem, Button, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import { AiFillCheckSquare } from 'react-icons/ai';
import { MdLocationOn, MdLocalParking, MdPool, MdFastfood } from 'react-icons/md';
import { FaWifi } from 'react-icons/fa';
import { CgGym } from 'react-icons/cg';
import Rating from '../components/Rating';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F16A67'
        }
    }
});

const Accommodation = () => {
    let sum = 0;
    const params = useParams();
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(1);
    const [grade, setGrade] = useState(0);
    const [activePhoto, setActivePhoto] = useState(0);
    const [gradeError, setGradeError] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(4);

    const { accommodation, isLoading } = useSelector(state => state.accommodation);
    const { reviews, isLoadingRew, isSuccessRew } = useSelector(state => state.review);

    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validationSchema: Yup.object({
            comment: Yup.string().required('Required'),
        }),
        onSubmit: (values, { resetForm }) => {
            const { comment } = values;
            if (grade < 1 || grade > 5) {
                setGradeError(true)
            } else {
                const reviewData = {
                    comment,
                    grade
                }
                dispatch(createReview(reviewData, accommodation.id));
                resetForm({ values: '' });
            }
        }
    })

    useEffect(() => {
        dispatch(getAccommodationById(params.accommodationId));
    }, [params.accommodationId])

    useEffect(() => {
        dispatch(getReviews());
    }, [])

    if (isLoading || accommodation.images === undefined) {
        return <Spinner />
    }

    const ratingChanged = (newRating) => {
        setGrade(newRating);
        setGradeError(false);
    };

    const showmore = () => {
        setItemsToShow(reviews.length)
    }

    const showless = () => {
        setItemsToShow(4)
    }

    const reviewArr = reviews.filter(rew => rew.accommodationId === accommodation.id);
    const sortedReviews = reviews.sort((a, b) => new Date(...a.commentDate.split('.')) - new Date(...b.commentDate.split('.')));
    console.log(sortedReviews);

    for (let i = 0; i < reviewArr.length; i++) {
        sum += reviewArr[i].grade;
    }

    let averageGrade = (sum / reviewArr.length).toFixed(1);

    return (
        <ThemeProvider theme={theme}>
            <NavigationBar />
            <Container maxWidth='xl'>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h4'>{accommodation.name}</Typography>
                    <Box display='flex' alignItems='center' sx={{ ml: '1rem' }}>
                        <Rating value={accommodation.stars} color={'rgb(233, 225, 45)'} />
                    </Box>
                </Box>
                <Box display='flex' sx={{ mt: '2.5rem' }}>
                    <Box>
                        <img style={accommodation.images.length < 2 ? { width: '72.8rem', height: '37rem', paddingLeft: '10.1rem' } : { width: '68rem', height: '35rem', marginRight: '5rem' }} src={accommodation.images[activePhoto].url} />
                    </Box>
                    <Box display='flex' flexDirection='column'>
                        {accommodation.images.map((image, i) => (
                            <img key={i}
                                onClick={() => setActivePhoto(i)}
                                src={image.url}
                                style={accommodation.images.length < 2 ? { display: 'none' } : { width: '19.5rem', maxHeight: '9rem', cursor: 'pointer', marginBottom: '0.3rem' }}
                                className='btn-hover'
                            />
                        ))}
                    </Box>
                </Box>
                <Box sx={{ mt: '3.5rem', mb: '1.5rem' }} display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant='paragraph' sx={{ fontWeight: '600', fontSize: '24px' }}>Most popular facilities</Typography>
                    <Box display='flex' alignItems='center'>
                        <MdLocationOn size={50} />
                        <Typography variant='paragraph' sx={{ fontWeight: '600', fontSize: '20px' }}>Location: <span style={{ fontWeight: '300' }}>{accommodation.city}</span></Typography>
                    </Box>
                </Box>
                <Box sx={{ mt: '3.5rem', mb: '1.5rem' }} display='flex'>
                    {accommodation.services && accommodation.services.map((service, index) => (
                        <Box display='flex' alignItems='center' key={index}>
                            <Typography>{service.name === "Free Wi-Fi" && <FaWifi size={40} style={{ color: '#068112', paddingRight: '0.8rem' }} />}</Typography>
                            <Typography>{service.name === "Parking" && <MdLocalParking size={40} style={{ color: '#042998', paddingRight: '0.8rem' }} />}</Typography>
                            <Typography>{service.name === "Gym" && <CgGym size={40} style={{ color: '#A46609', paddingRight: '0.8rem' }} />}</Typography>
                            <Typography>{service.name === "Pool" && <MdPool size={40} style={{ color: '#042998', paddingRight: '0.8rem' }} />}</Typography>
                            <Typography>{(service.name === "Breakfast" || service.name === "Lunch" || service.name === "Dinner") && <MdFastfood size={40} style={{ color: '#042998', paddingRight: '0.8rem' }} />}</Typography>
                            <Typography variant='paragraph' sx={{ fontSize: '16px', fontWeight: '600', mr: '4rem' }}>
                                {service.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ mt: '3.5rem', mb: '1rem' }}>
                    <Typography variant='paragraph' sx={{ fontWeight: '600', fontSize: '24px' }}>Selected filters</Typography>
                </Box>
                <Box sx={{ mt: '2.5rem', mb: '1rem' }} display='flex'>
                    <Box display='flex' alignItems='center' sx={{ mr: '2rem' }}>
                        <AiFillCheckSquare size={20} style={{ marginRight: '1.3rem', color: '#068112' }} />
                        <Typography variant='paragraph'>Hotel</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' sx={{ mr: '2rem' }}>
                        <AiFillCheckSquare size={20} style={{ marginRight: '1.3rem', color: '#068112' }} />
                        <Typography variant='paragraph'>5 stars</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' sx={{ mr: '2rem' }}>
                        <AiFillCheckSquare size={20} style={{ marginRight: '1.3rem', color: '#068112' }} />
                        <Typography variant='paragraph'>Restaurant</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' sx={{ mr: '2rem' }}>
                        <AiFillCheckSquare size={20} style={{ marginRight: '1.3rem', color: '#068112' }} />
                        <Typography variant='paragraph'>Fitness centre</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' sx={{ mr: '2rem' }}>
                        <AiFillCheckSquare size={20} style={{ marginRight: '1.3rem', color: '#068112' }} />
                        <Typography variant='paragraph'>Free parking</Typography>
                    </Box>
                    <Box display='flex' alignItems='center'>
                        <AiFillCheckSquare size={20} style={{ marginRight: '1.3rem', color: '#068112' }} />
                        <Typography variant='paragraph'>Free Wi Fi</Typography>
                    </Box>
                </Box>
                <Box sx={{ mt: '3.5rem', mb: '1.5rem' }} display='flex' alignItems='center' justifyContent='space-between'>
                    <Box>
                        <Typography variant='h5' sx={{ fontSize: '24px', fontWeight: '600', lineHeight: '2.2' }}>Type of room</Typography>
                        <Typography variant='paragraph'>{accommodation.roomType}-room</Typography>
                    </Box>
                    <Box>
                        <Typography variant='h5' sx={{ fontSize: '24px', fontWeight: '600', lineHeight: '2.2' }}>Select amount of rooms</Typography>
                        <Select sx={{ height: '2rem', width: '6.5rem' }}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        >
                            <MenuItem selected value={1}>One</MenuItem>
                            <MenuItem value={2}>Two</MenuItem>
                            <MenuItem value={3}>Three</MenuItem>
                            <MenuItem value={4}>Four</MenuItem>
                        </Select>
                    </Box>
                    <Box>
                        <Typography variant='h5' sx={{ fontSize: '24px', fontWeight: '600', lineHeight: '1.5', color: '#F16A67' }}>Price:</Typography>
                        <Typography variant='paragraph' sx={{ fontSize: '32px', color: '#F16A67', fontWeight: '600' }}>{accommodation.price * amount}KM/d</Typography>
                    </Box>
                </Box>
                <Box sx={{ mt: '4.5rem', mb: '1.5rem' }}>
                    <Typography variant='body1' sx={{ fontWeight: '300', color: '#323642' }}>{accommodation.description}</Typography>
                </Box>
                <Box textAlign='end' sx={{ my: '5rem' }}>
                    <Link to={`/reservation/${accommodation.id}`}>
                        <Button className='btn-hover' variant='contained' style={{ textTransform: 'none', color: '#fff', fontSize: '20px', fontWeight: '600', padding: '0.5rem 4.2rem' }}>
                            Reserve
                        </Button>
                    </Link>
                </Box>
                <Box marginBottom='4rem' display='flex' flexDirection='column'>
                    <Typography variant='body1' sx={{ fontSize: '22px', fontWeight: '600' }}>Rate this accommodation</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <ReactStars
                            count={5}
                            size={36}
                            activeColor="#ffd700"
                            isHalf={true}
                            onChange={ratingChanged}
                        />
                        {gradeError ? <Typography sx={{ fontSize: '14px', fontWeight: '300' }}>Please enter a rating</Typography> : null}
                        <TextField
                            variant='outlined'
                            multiline
                            rows={4}
                            error={formik.touched.comment && Boolean(formik.errors.comment)}
                            helperText={formik.touched.comment && formik.errors.comment}
                            name='comment'
                            value={formik.values.comment}
                            onChange={formik.handleChange}
                            label='Describe your experience'
                            sx={{ width: '30rem', my: '1.5rem' }}
                        />
                        <Button type='submit' variant='contained' sx={{ display: 'block', textTransform: 'none', color: '#fff', width: '7rem' }}>
                            Post
                        </Button>
                    </form>
                </Box>
                <Box marginBottom='7rem'>
                    <Typography variant='body1' sx={{ fontSize: '22px', fontWeight: '600' }}>Ratings and reviews</Typography>
                    {
                        isNaN(averageGrade) ? null : <Box display='flex' alignItems='center'>
                            <Typography sx={{ fontSize: '56px', fontWeight: '600', mr: '0.8rem' }}>{averageGrade}</Typography>
                            <Rating value={averageGrade} color={'#E9E12D'} />
                        </Box>
                    }
                    {sortedReviews.slice(0, itemsToShow).map((rew, index) => (
                        rew.accommodationId === accommodation.id && (
                            <Box key={index} marginTop='1.5rem'>
                                <Typography sx={{ fontSize: '18px', fontWeight: '600', mb: '0.5rem' }}>{rew.reviewer}</Typography>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>{rew.comment}</Typography>
                            </Box>
                        )
                    ))}
                    {
                        reviewArr.length !== 0 && (itemsToShow === 4) ?
                            <Button className='btn-hover' sx={{ mt: '1.5rem', fontSize: '18px', fontWeight: '400', p: '0' }} onClick={showmore}>Show More</Button>
                            : reviewArr.length !== 0 && <Button className='btn-hover' sx={{ mt: '1.5rem', fontSize: '18px', fontWeight: '400', p: '0' }} onClick={showless}>Show Less</Button>
                    }
                    {reviewArr.length === 0 && <Typography marginTop='1rem' sx={{ fontSize: '18px' }}>There are no reviews for this accommodation... :(</Typography>}
                </Box>
            </Container>
            <Footer />
        </ThemeProvider>
    )
}

export default Accommodation;
