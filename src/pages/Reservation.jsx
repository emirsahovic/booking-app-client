import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAccommodationById } from "../redux/actions/accommodationActions";
import { createReservation, resetRes } from "../redux/actions/reservationActions";

import * as Yup from 'yup';
import { Container, Typography, Box, TextField, FormGroup, Button, InputLabel, Select, FormControl, MenuItem } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material';

import NavigationBar from "../components/NavigationBar";
import Spinner from "../components/Spinner";
import ReservationItem from "../components/ReservationItem";

import Footer from "../components/Footer";
import moment from "moment";

const theme = createTheme({
    palette: {
        primary: {
            main: '#F16A67'
        }
    }
});

const Reservation = () => {
    const [childAge, setChildAge] = useState(1);

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { accommodation, isLoading } = useSelector(state => state.accommodation);
    const { isLoadingRes, isSuccessRes, isErrorRes } = useSelector(state => state.reservation);

    const formik = useFormik({
        initialValues: {
            numberOfCompanions: '',
            isCompanionAChild: false,
            numberOfDaysStaying: '',
            arrivalDateTime: '',
            departureDateTime: '',
            totalPrice: '',
            guestEmail: ''
        },
        validationSchema: Yup.object({
            numberOfCompanions: Yup.string().matches(/^[0-9]+$/, "Please enter a number of companions").required('Required'),
            isCompanionAChild: Yup.string().required('Required'),
            arrivalDateTime: Yup.date('Enter a valid date').required('Required'),
            departureDateTime: Yup.date('Enter a valid date').required('Required'),
            guestEmail: Yup.string().email('Enter a valid email address').required('Required')
        }),
        onSubmit: (values, { resetForm }) => {
            formik.values.numberOfDaysStaying = moment(formik.values.departureDateTime).diff(formik.values.arrivalDateTime, 'days');
            formik.values.totalPrice = formik.values.isCompanionAChild && childAge <= 12 ? (formik.values.numberOfCompanions - 1) * moment(formik.values.departureDateTime).diff(formik.values.arrivalDateTime, 'days') * accommodation.price + (accommodation.price - accommodation.price * 0.2) * moment(formik.values.departureDateTime).diff(formik.values.arrivalDateTime, 'days') : formik.values.numberOfCompanions * moment(formik.values.departureDateTime).diff(formik.values.arrivalDateTime, 'days') * accommodation.price;

            const { numberOfCompanions, isCompanionAChild, numberOfDaysStaying, arrivalDateTime, departureDateTime, totalPrice, guestEmail } = values;
            const reservationData = {
                numberOfCompanions: parseInt(numberOfCompanions),
                isCompanionAChild,
                numberOfDaysStaying,
                arrivalDateTime,
                departureDateTime,
                totalPrice,
                guestEmail
            }

            dispatch(createReservation(reservationData, accommodation.id));
            resetForm({ values: '' });
        }
    })

    useEffect(() => {
        dispatch(getAccommodationById(params.accommodationId));

        dispatch(resetRes());
    }, [params.accommodationId])

    if (isLoading || isLoadingRes) {
        return <Spinner />
    }

    if (isSuccessRes) {
        setTimeout(() => {
            navigate(`/payment/${accommodation.id}`)
        }, 3000)
    }

    return (
        <ThemeProvider theme={theme}>
            <NavigationBar />
            <Container maxWidth='xl' sx={{ mb: '8rem' }}>
                <Typography variant='h3' sx={{ fontSize: '56px', fontWeight: '600', mb: '3.3rem' }}>Reservation Details</Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Box sx={{ mr: '35%' }}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField sx={{ mb: '2rem' }}
                                fullWidth
                                type='text'
                                name='numberOfCompanions'
                                value={formik.values.numberOfCompanions}
                                error={formik.touched.numberOfCompanions && Boolean(formik.errors.numberOfCompanions)}
                                helperText={formik.touched.numberOfCompanions && formik.errors.numberOfCompanions}
                                onChange={formik.handleChange}
                                label='Number of companions'
                            />
                            <FormControl fullWidth>
                                <InputLabel id="child-label">Is companion a child</InputLabel>
                                <Select
                                    labelId="child-label"
                                    name="isCompanionAChild"
                                    value={formik.values.isCompanionAChild}
                                    error={formik.touched.isCompanionAChild && Boolean(formik.errors.isCompanionAChild)}
                                    onChange={formik.handleChange}
                                    label="Is companion a child"
                                    sx={{ mb: '0.8rem', width: '100%' }}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField sx={{ my: '0.8rem' }}
                                fullWidth
                                type='text'
                                label="Enter child's age"
                                value={childAge}
                                onChange={e => setChildAge(e.target.value)}
                                disabled={!formik.values.isCompanionAChild}
                            />
                            <TextField sx={{ mt: '1.2rem' }}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                type='datetime-local'
                                name='arrivalDateTime'
                                value={formik.values.arrivalDateTime}
                                error={formik.touched.arrivalDateTime && Boolean(formik.errors.arrivalDateTime)}
                                helperText={formik.touched.arrivalDateTime && formik.errors.arrivalDateTime}
                                onChange={formik.handleChange}
                                label='Arrival datetime'
                            />
                            <TextField sx={{ mt: '1.8rem', mb: '0.8rem' }}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                type='datetime-local'
                                name='departureDateTime'
                                value={formik.values.departureDateTime}
                                error={formik.touched.departureDateTime && Boolean(formik.errors.departureDateTime)}
                                helperText={formik.touched.departureDateTime && formik.errors.departureDateTime}
                                onChange={formik.handleChange}
                                label='Departure datetime'
                            />
                            <TextField sx={{ my: '0.8rem' }}
                                fullWidth
                                disabled
                                type='text'
                                name='numberOfDaysStaying'
                                value={isNaN(moment(formik.values.departureDateTime).diff(formik.values.arrivalDateTime, 'days')) ? 0 : moment(formik.values.departureDateTime).diff(formik.values.arrivalDateTime, 'days')}
                                onChange={formik.handleChange}
                                label='Number of days staying'
                            />
                            <TextField sx={{ my: '0.8rem' }}
                                fullWidth
                                type='text'
                                name='guestEmail'
                                value={formik.values.guestEmail}
                                error={formik.touched.guestEmail && Boolean(formik.errors.guestEmail)}
                                helperText={formik.touched.guestEmail && formik.errors.guestEmail}
                                onChange={formik.handleChange}
                                label='Guest email address'
                            />
                            <Typography variant='body1' sx={{ my: '1.5rem', color: '#F16A67', fontWeight: '600', fontSize: '24px' }}>
                                Total Price:
                            </Typography>
                            <FormGroup row>
                                <TextField
                                    variant='outlined'
                                    inputProps={{ style: { fontSize: 22 } }}
                                    disabled
                                    value={isNaN(formik.values.isCompanionAChild && childAge <= 12 ? (formik.values.numberOfCompanions - 1) * moment(formik.values.departureDateTime).diff(formik.values.arrivalDateTime, 'days') * accommodation.price + (accommodation.price - accommodation.price * 0.2) * moment(formik.values.departureDateTime).diff(formik.values.arrivalDateTime, 'days') : formik.values.numberOfCompanions * moment(formik.values.departureDateTime).diff(formik.values.arrivalDateTime, 'days') * accommodation.price) ? 0 : formik.values.isCompanionAChild && childAge <= 12 ? (formik.values.numberOfCompanions - 1) * moment(formik.values.departureDateTime).diff(formik.values.arrivalDateTime, 'days') * accommodation.price + (accommodation.price - accommodation.price * 0.2) * moment(formik.values.departureDateTime).diff(formik.values.arrivalDateTime, 'days') : formik.values.numberOfCompanions * moment(formik.values.departureDateTime).diff(formik.values.arrivalDateTime, 'days') * accommodation.price}
                                />
                                <Box sx={{ border: '1px solid #999', position: 'relative', width: '3.5rem', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>
                                    <Typography variant='paragraph' sx={{ position: 'absolute', top: 18, left: 11 }}>BAM</Typography>
                                </Box>
                            </FormGroup>
                            <Button type='submit' fullWidth variant='contained' sx={{ textTransform: 'none', mt: '3.5rem', fontSize: '20px', fontWeight: '600' }}>
                                Finish Reservation
                            </Button>
                        </form>
                    </Box>

                    <Box display='flex' flexDirection='column' justifyContent='space-between'>
                        <Box>
                            <Typography variant='body1' sx={{ mb: '1.3rem', color: '#323642', fontWeight: '600', fontSize: '24px', mr: '8rem' }}>
                                Booking details
                            </Typography>
                            <ReservationItem accommodation={accommodation} />
                        </Box>
                        {isSuccessRes && !isErrorRes && !isLoadingRes &&
                            <Typography id='hideMe' align='center' sx={{ color: '#fff', backgroundColor: '#393939', mt: '1.5rem', py: '0.6rem', fontWeight: '600', fontSize: '20px', borderRadius: '4px' }}>
                                Successful Reservation
                            </Typography>
                        }
                    </Box>
                </Box>
            </Container>
            <Footer />
        </ThemeProvider>
    )
}

export default Reservation;
