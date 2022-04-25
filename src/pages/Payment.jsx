import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAccommodationById } from "../redux/actions/accommodationActions";

import { Container, Typography, Box, TextField, FormGroup, Button } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material';

import NavigationBar from "../components/NavigationBar";
import Spinner from "../components/Spinner";
import ReservationItem from "../components/ReservationItem";

import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import Footer from "../components/Footer";

const theme = createTheme({
    palette: {
        primary: {
            main: '#F16A67'
        }
    }
});

const Payment = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const { accommodation, isLoading } = useSelector(state => state.accommodation);

    useEffect(() => {
        dispatch(getAccommodationById(params.accommodationId));
    }, [params.accommodationId])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <ThemeProvider theme={theme}>
            <NavigationBar />
            <Container maxWidth='xl' sx={{ mb: '8rem' }}>
                <Typography variant='h3' sx={{ fontSize: '56px', fontWeight: '600', mb: '2.5rem' }}>Payment</Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Box flexGrow='1' sx={{ mr: '40%' }}>
                        <Typography variant='body1' sx={{ mb: '1.3rem', color: '#323642', fontWeight: '600', fontSize: '24px' }}>
                            Traveler details
                        </Typography>
                        <TextField sx={{ mb: '0.8rem' }}
                            fullWidth
                            type='text'
                            label='First Name'
                        />
                        <TextField sx={{ my: '0.8rem' }}
                            fullWidth
                            type='text'
                            label='Last Name'
                        />
                        <TextField sx={{ my: '0.8rem' }}
                            fullWidth
                            type='text'
                            label='Email'
                        />
                        <TextField sx={{ my: '0.8rem' }}
                            fullWidth
                            type='text'
                            label='Phone Number'
                        />
                        <TextField sx={{ mt: '1.2rem', mb: '0.8rem' }}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            type='date'
                            label='Date of birth'
                        />
                        <TextField sx={{ my: '0.8rem' }}
                            fullWidth
                            type='text'
                            label='Country'
                        />
                        <TextField sx={{ my: '0.8rem' }}
                            fullWidth
                            type='text'
                            label='Passport Number'
                        />
                        <TextField sx={{ mt: '1.2rem', mb: '0.8rem' }}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            type='date'
                            label='Expiration Date'
                        />
                        <Box display='flex' alignItems='center'>
                            <Typography variant='body1' sx={{ my: '1.5rem', color: '#323642', fontWeight: '600', fontSize: '24px' }}>
                                Pay With:
                            </Typography>
                            <FaCcVisa size={30} style={{ marginLeft: '1.5rem', marginRight: '1rem' }} />
                            <FaCcMastercard size={30} />
                        </Box>
                        <TextField sx={{ my: '0.8rem' }}
                            fullWidth
                            type='text'
                            label='Card Number'
                        />
                        <TextField sx={{ my: '0.8rem' }}
                            fullWidth
                            type='month'
                            label='Expiration MM/YY'
                        />
                        <TextField sx={{ my: '0.8rem' }}
                            fullWidth
                            type='text'
                            label='Card Holder Name'
                        />
                        <TextField sx={{ my: '0.8rem' }}
                            fullWidth
                            type='text'
                            label='CVC'
                        />
                        <Typography variant='body1' sx={{ my: '1.5rem', color: '#F16A67', fontWeight: '600', fontSize: '24px' }}>
                            Total Price:
                        </Typography>
                        <FormGroup row>
                            <TextField variant="outlined" disabled />
                            <Box sx={{ border: '1px solid #999', position: 'relative', width: '3.5rem', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>
                                <Typography variant='paragraph' sx={{ position: 'absolute', top: 14, left: 10 }}>BAM</Typography>
                            </Box>
                        </FormGroup>
                        <Button fullWidth variant='contained' sx={{ textTransform: 'none', mt: '3.5rem', fontSize: '20px', fontWeight: '600' }}>
                            Finish Payment
                        </Button>
                    </Box>

                    <Box>
                        <Typography variant='body1' sx={{ mb: '1.3rem', color: '#323642', fontWeight: '600', fontSize: '24px', mr: '8rem' }}>
                            Booking details
                        </Typography>
                        <ReservationItem accommodation={accommodation} />
                    </Box>
                </Box>
            </Container>
            <Footer />
        </ThemeProvider>
    )
}

export default Payment;
