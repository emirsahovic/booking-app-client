import { Container, Typography, Box, TextField, FormControlLabel, Checkbox, Button, Select, MenuItem, FormControl, FormGroup, InputLabel } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import * as Yup from 'yup';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createAccommodation } from '../redux/actions/accommodationActions';
import Spinner from '../components/Spinner';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F16A67'
        }
    }
});

const HotelRegistration = () => {
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [navigateTo, setNavigateTo] = useState(false);
    const { isSuccess, isLoading, isError } = useSelector(state => state.accommodation);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            description: '',
            stars: '',
            city: '',
            address: '',
            roomType: '',
            contact: '',
            price: '',
            servicesArray: [],
            imagesArray: []
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            type: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            stars: Yup.string().matches(/^[0-9]+$/, "Only numbers are allowed").required('Required'),
            city: Yup.string().required('Required'),
            address: Yup.string().required('Required'),
            roomType: Yup.string().required('Required'),
            contact: Yup.string().matches(/^[0-9]+$/, "Phone number must contain only digits").min(8, 'Phone number should contain at least 8 digits').max(15, 'Phone number cannot be longer than 15 digits').required('Required'),
            price: Yup.string().matches(/^[0-9]+$/, "Enter your price").required('Required')
        }),
        onSubmit: (values, { resetForm }) => {
            if (image1 !== '') values.imagesArray.push(image1);
            if (image2 !== '') values.imagesArray.push(image2);
            if (image3 !== '') values.imagesArray.push(image3);
            const { name, type, description, stars, city, address, roomType, contact, price, servicesArray, imagesArray } = values;
            const accommodationData = {
                name,
                type,
                description,
                stars: parseInt(stars),
                city,
                address,
                roomType,
                contact,
                price: parseInt(price),
                servicesArray,
                imagesArray
            }

            if (isSuccess && !isLoading) {
                resetForm({ values: '' });
            }

            dispatch(createAccommodation(accommodationData));
            setImage1('');
            setImage2('');
            setImage3('');
            setTimeout(() => {
                navigate('/accommodations');
            }, 850)

        }
    })

    useEffect(() => {
        if (!user || (user && user.role !== 'User' && user.role !== 'Admin')) {
            setNavigateTo(true)
        }
    }, [user])

    if (isLoading && !isSuccess) {
        return <Spinner />
    }

    if (navigateTo) {
        return <Navigate to='/' />
    }

    return (
        <ThemeProvider theme={theme}>
            <NavigationBar />
            <Container maxWidth='xl'>
                <Typography sx={{ fontSize: '56px', fontWeight: 'bold' }}>
                    Accommodation Registration
                </Typography>
                <Typography sx={{ fontSize: '24px', fontWeight: 'bold', mt: '2.5rem' }}>
                    Property type
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box display='flex' alignItems='center' marginTop='1.5rem'>
                        <FormControlLabel
                            control={
                                <input
                                    id='cb'
                                    className='larger'
                                    style={{ margin: '0 1rem 0 1rem' }}
                                    name="type"
                                    type="radio"
                                    onChange={formik.handleChange}
                                    value="Hotel"
                                />}
                            label='Hotel'
                        />
                        <FormControlLabel
                            control={
                                <input
                                    id='cb'
                                    className='larger'
                                    style={{ margin: '0 1rem 0 1.5rem' }}
                                    name="type"
                                    type="radio"
                                    onChange={formik.handleChange}
                                    value="Hostel"
                                />}
                            label='Hostel'
                        />
                        <FormControlLabel
                            control={
                                <input
                                    id='cb'
                                    className='larger'
                                    style={{ margin: '0 1rem 0 1.5rem' }}
                                    name="type"
                                    type="radio"
                                    onChange={formik.handleChange}
                                    value="Motel"
                                />}
                            label='Motel'
                        />
                        <FormControlLabel
                            control={
                                <input
                                    id='cb'
                                    className='larger'
                                    style={{ margin: '0 1rem 0 1.5rem' }}
                                    name="type"
                                    type="radio"
                                    onChange={formik.handleChange}
                                    value="Apartment"
                                />}
                            label='Apartment'
                        />
                    </Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 'bold', mt: '2.5rem' }}>
                        Information of the property type
                    </Typography>
                    <Box display='flex' flexDirection='column'>
                        <TextField sx={{ mt: '1.5rem', mb: '0.8rem', width: '40%' }}
                            type='text'
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            label='Name'
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField sx={{ mt: '1.2rem', mb: '0.8rem', width: '40%' }}
                            type='text'
                            name='city'
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            label='City'
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                        <TextField sx={{ mt: '1.2rem', mb: '0.8rem', width: '40%' }}
                            type='text'
                            name='address'
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            label='Address'
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                        <TextField sx={{ mt: '1.2rem', mb: '2rem', width: '40%' }}
                            type='text'
                            name='stars'
                            value={formik.values.stars}
                            onChange={formik.handleChange}
                            label='Stars'
                            error={formik.touched.stars && Boolean(formik.errors.stars)}
                            helperText={formik.touched.stars && formik.errors.stars}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="room-label">Type of room</InputLabel>
                            <Select
                                labelId="room-label"
                                name="roomType"
                                value={formik.values.roomType}
                                onChange={formik.handleChange}
                                label="Type of room"
                                sx={{ mb: '0.8rem', width: '40%' }}
                                error={formik.touched.roomType && Boolean(formik.errors.roomType)}
                            >
                                <MenuItem value={"Single"}>Single</MenuItem>
                                <MenuItem value={"Double"}>Double</MenuItem>
                                <MenuItem value={"Triple"}>Triple</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField sx={{ mt: '1.2rem', mb: '0.8rem', width: '40%' }}
                            type='text'
                            name='contact'
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            label='Phone Number'
                            error={formik.touched.contact && Boolean(formik.errors.contact)}
                            helperText={formik.touched.contact && formik.errors.contact}
                        />
                        <FormGroup row>
                            <TextField sx={{ mt: '1.2rem', mb: '0.8rem', width: '40%' }}
                                type='text'
                                name='price'
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                label='Price per night'
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}
                            />
                            <Box sx={{ position: 'relative', width: '3rem', height: '3.4rem', border: '1px solid #999', borderTopRightRadius: '5px', borderBottomRightRadius: '5px', mt: '1.2rem' }}>
                                <Typography sx={{ position: 'absolute', top: 15, left: 12, fontWeight: '600' }}>
                                    KM
                                </Typography>
                            </Box>
                        </FormGroup>
                        <TextField sx={{ mt: '1.2rem', mb: '0.8rem', width: '50%' }}
                            multiline
                            name='description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            rows={5}
                            label='Description'
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 'bold', mt: '2.5rem' }}>
                        Services and facilities
                    </Typography>
                    <Box display='flex' alignItems='center' marginTop='1.5rem'>
                        <FormControlLabel
                            control={
                                <input
                                    id='cb'
                                    className='larger'
                                    style={{ margin: '0 1rem 0 1rem' }}
                                    name="servicesArray"
                                    type="checkbox"
                                    onChange={formik.handleChange}
                                    value="Breakfast"
                                />}
                            label='Breakfast'
                        />
                        <FormControlLabel
                            control={
                                <input
                                    id='cb'
                                    className='larger'
                                    style={{ margin: '0 1rem 0 1.5rem' }}
                                    name="servicesArray"
                                    type="checkbox"
                                    onChange={formik.handleChange}
                                    value="Dinner"
                                />}
                            label='Dinner'
                        />
                        <FormControlLabel
                            control={
                                <input
                                    id='cb'
                                    className='larger'
                                    style={{ margin: '0 1rem 0 1.5rem' }}
                                    name="servicesArray"
                                    type="checkbox"
                                    onChange={formik.handleChange}
                                    value="Lunch"
                                />}
                            label='Lunch'
                        />
                        <FormControlLabel
                            control={
                                <input
                                    id='cb'
                                    className='larger'
                                    style={{ margin: '0 1rem 0 1.5rem' }}
                                    name="servicesArray"
                                    type="checkbox"
                                    onChange={formik.handleChange}
                                    value="Free Wi-Fi"
                                />}
                            label='Free Wi-Fi'
                        />
                        <FormControlLabel
                            control={
                                <input
                                    id='cb'
                                    className='larger'
                                    style={{ margin: '0 1rem 0 1.5rem' }}
                                    name="servicesArray"
                                    type="checkbox"
                                    onChange={formik.handleChange}
                                    value="Parking"
                                />}
                            label='Parking'
                        />
                        <FormControlLabel
                            control={
                                <input
                                    id='cb'
                                    className='larger'
                                    style={{ margin: '0 1rem 0 1.5rem' }}
                                    name="servicesArray"
                                    type="checkbox"
                                    onChange={formik.handleChange}
                                    value="Pool"
                                />}
                            label='Pool'
                        />
                        <FormControlLabel
                            control={
                                <input
                                    id='cb'
                                    className='larger'
                                    style={{ margin: '0 1rem 0 1.5rem' }}
                                    name="servicesArray"
                                    type="checkbox"
                                    onChange={formik.handleChange}
                                    value="Gym"
                                />}
                            label='Gym'
                        />
                    </Box>
                    <Box display='flex' flexDirection='column'>
                        <TextField sx={{ mt: '4rem', width: '50%' }}
                            name='image1'
                            value={image1}
                            onChange={e => setImage1(e.target.value)}
                            label='Image 1 Url'
                            required
                        />
                        <TextField sx={{ mt: '1.5rem', width: '50%' }}
                            name='image2'
                            value={image2}
                            onChange={e => setImage2(e.target.value)}
                            label='Image 2 Url'
                        />
                        <TextField sx={{ mt: '1.5rem', width: '50%' }}
                            name='image3'
                            value={image3}
                            onChange={e => setImage3(e.target.value)}
                            label='Image 3 Url'
                        />
                    </Box>
                    <Box textAlign='end' marginBottom='5rem' marginTop='5rem'>
                        <Button type='submit' variant='contained' sx={{ textTransform: 'none', width: '20%', py: '0.5rem', fontWeight: '600', fontSize: '18px' }}>Post</Button>
                    </Box>
                </form>
            </Container>
            <Footer />
        </ThemeProvider>
    )
}

export default HotelRegistration;
