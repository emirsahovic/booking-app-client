import { Container, Box, TextField, Typography, InputAdornment, IconButton, Button, FormGroup, FormControlLabel, Checkbox, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from '@mui/material';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getAccommodations, getFilteredAccommodations } from '../redux/actions/accommodationActions';

import Spinner from "../components/Spinner";
import NavigationBar from "../components/NavigationBar";
import AccommodationFilterItem from "../components/AccommodationFilterItem";
import Footer from "../components/Footer";

const theme = createTheme({
    palette: {
        primary: {
            main: '#F16A67'
        }
    },
});

const Accommodations = () => {
    const [city, setCity] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const { accommodations, isLoading } = useSelector(state => state.accommodation);
    const { user } = useSelector(state => state.auth);

    const formik = useFormik({
        initialValues: {
            typeFil: ''
        },
        onSubmit: (values) => {
            console.log(values.typeFil[0]);
            dispatch(getFilteredAccommodations(values.typeFil[0]));
        }
    })

    useEffect(() => {
        dispatch(getAccommodations());
    }, [])

    const handleSearch = () => {
        dispatch(getAccommodations(city, type, name));
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <ThemeProvider theme={theme}>
            <NavigationBar />
            <Container maxWidth='xl'>
                <Box display='flex'>
                    <Box display='flex' flexDirection='column' sx={{ width: '25rem' }}>
                        <Box sx={{ height: '28rem', width: '100%', border: '1px solid #B7B5B566', boxShadow: '0px 6px 18px -15px #111', px: '1.5rem', py: '2rem' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#323642', mb: '0.7rem' }}>Destination:</Typography>
                            <TextField
                                name='city'
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment>
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#323642', mb: '0.7rem', mt: '1.5rem' }}>Type of accommodation:</Typography>
                            <FormControl fullWidth>
                                <Select
                                    name="type"
                                    value={type}
                                    onChange={e => setType(e.target.value)}
                                >
                                    <MenuItem value={''}></MenuItem>
                                    <MenuItem value={"Hotel"}>Hotel</MenuItem>
                                    <MenuItem value={"Hostel"}>Hostel</MenuItem>
                                    <MenuItem value={"Motel"}>Motel</MenuItem>
                                    <MenuItem value={"Apartment"}>Apartment</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#323642', mb: '0.7rem', mt: '1.5rem' }}>Name of accommodation:</Typography>
                            <TextField
                                fullWidth
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                variant="outlined"
                                type='text'
                            />
                            <Button onClick={handleSearch} variant='contained' sx={{ textTransform: 'none', width: '100%', height: '3rem', mt: '3rem' }}>Search</Button>
                        </Box>
                        <Box>
                            <Typography sx={{ color: '#323642', fontSize: '24px', fontWeight: '500', my: '2rem' }}>Filter by:</Typography>
                            <Box sx={{ height: '14rem', width: '100%', border: '1px solid #B7B5B566', boxShadow: '0px 6px 18px -15px #111', px: '1.5rem', py: '2rem' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#323642', mb: '0.7rem' }}>Property types:</Typography>
                                <form onSubmit={formik.handleSubmit}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox name='typeFil' sx={{ pr: '1rem' }} />} value='Hotel' onChange={formik.handleChange} label="Hotel" />
                                        <FormControlLabel control={<Checkbox name='typeFil' sx={{ pr: '1rem' }} />} value='Hostel' onChange={formik.handleChange} label="Hostel" />
                                        <FormControlLabel control={<Checkbox name='typeFil' sx={{ pr: '1rem' }} />} value='Motel' onChange={formik.handleChange} label="Motel" />
                                        <FormControlLabel control={<Checkbox name='typeFil' sx={{ pr: '1rem' }} />} value='Apartment' onChange={formik.handleChange} label="Apartment" />
                                    </FormGroup>
                                    <Button sx={{ mt: '0.5rem' }} type='submit'>Filter</Button>
                                </form>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{ my: '2.5rem', height: '12rem', width: '100%', border: '1px solid #B7B5B566', boxShadow: '0px 6px 18px -15px #111', px: '1.5rem', py: '2rem' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#323642', mb: '0.7rem' }}>Star rating:</Typography>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox sx={{ pr: '1rem' }} />} label="3 stars" />
                                    <FormControlLabel control={<Checkbox sx={{ pr: '1rem' }} />} label="4 stars" />
                                    <FormControlLabel control={<Checkbox sx={{ pr: '1rem' }} />} label="5 stars" />
                                    <FormControlLabel control={<Checkbox sx={{ pr: '1rem' }} />} label="Unrated" />
                                </FormGroup>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{ height: '18rem', width: '100%', marginBottom: '4rem', border: '1px solid #B7B5B566', boxShadow: '0px 6px 18px -15px #111', px: '1.5rem', py: '2rem' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#323642', mb: '0.7rem' }}>Facilities:</Typography>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox sx={{ pr: '1rem' }} />} label="Free parking" />
                                    <FormControlLabel control={<Checkbox sx={{ pr: '1rem' }} />} label="Free WiFi" />
                                    <FormControlLabel control={<Checkbox sx={{ pr: '1rem' }} />} label="Non-smoking rooms" />
                                    <FormControlLabel control={<Checkbox sx={{ pr: '1rem' }} />} label="Restaurant" />
                                    <FormControlLabel control={<Checkbox sx={{ pr: '1rem' }} />} label="Pets allowed" />
                                    <FormControlLabel control={<Checkbox sx={{ pr: '1rem' }} />} label="Fitness centre" />
                                </FormGroup>
                            </Box>
                        </Box>
                        {user && user.role === 'User' &&
                            <>
                                <Link to='/hotel/registration'>
                                    <Button variant='contained' fullWidth sx={{ textTransform: 'none', mb: '16rem', py: '0.7rem', fontWeight: '600' }}>Add Accommodation</Button>
                                </Link>
                            </>
                        }
                    </Box>
                    <Box sx={{ ml: '7rem', width: '62%' }}>
                        {accommodations && accommodations.responseAccommodations && accommodations.responseAccommodations.length === 0 &&
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='paragraph' sx={{ fontWeight: '500', color: '#323642', fontSize: '20px' }}>{city !== '' ? `Destination: ${city}` : { name } !== '' ? `Name of accommodation: ${name}` : null}</Typography>
                                <img src={process.env.PUBLIC_URL + '/assets/notfound.png'} style={{ maxWidth: '50rem', maxHeight: '32rem', margin: 'auto', display: 'block' }} alt='Not Found' />
                                <Typography variant='body1' textAlign='center' sx={{ mt: '3.3rem', fontWeight: '500', color: '#323642', fontSize: '26px' }}>Sorry! No results found :(</Typography>
                                <Typography variant='body1' textAlign='center' sx={{ mt: '1rem', fontWeight: '400', color: '#323642', fontSize: '16px' }}>We’re sorry what you were looking for. Please try another way.</Typography>
                            </Box>
                        }
                        {accommodations && accommodations.responseAccommodations &&
                            accommodations.responseAccommodations.slice(0, 6).map((acc, index) => (
                                <AccommodationFilterItem key={index} acc={acc} />
                            ))}
                    </Box>
                </Box>
            </Container>
            <Footer />
        </ThemeProvider>
    )
}

export default Accommodations;
