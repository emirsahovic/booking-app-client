import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, reset } from '../redux/actions/authActions';
import * as Yup from 'yup';

import { GrFormView, GrMail } from 'react-icons/gr';

import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import Spinner from '../components/Spinner';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F16A67'
        }
    }
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuccessRegister, isErrorRegister, isLoading, message } = useSelector(state => state.auth);

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
            phoneNumber: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Enter a valid email address').required('Required'),
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            username: Yup.string().max(32, 'Username cannot be longer than 32 characters').required('Required'),
            password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must contain 8 characters, one uppercase, one lowercase, one number and one special character").required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match').required('Required'),
            phoneNumber: Yup.string().matches(/^[0-9]+$/, "Phone number must contain only digits").min(8, 'Phone number should contain at least 8 digits').max(15, 'Phone number cannot be longer than 15 digits').required('Required')
        }),
        onSubmit: (values, { resetForm }) => {
            const { email, firstName, lastName, username, password, phoneNumber } = values;
            const userData = {
                username,
                password,
                firstName,
                lastName,
                email,
                phoneNumber
            }
            dispatch(registerUser(userData));
            if (isSuccessRegister) {
                resetForm({ values: '' });
            }
        }
    })

    useEffect(() => {
        if (isSuccessRegister) {
            navigate('/sign-in');
        }

        dispatch(reset());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, isSuccessRegister])

    if (!isErrorRegister && isLoading) {
        return <Spinner />
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='xl'>
                <Box display='flex' justifyContent='space-between' sx={{ pt: '1rem' }}>
                    <img src={process.env.PUBLIC_URL + '/assets/zebooklogo.png'} style={{ maxHeight: '7rem', maxWidth: '14rem' }} alt='Logo' />
                    <Typography variant='subtitle1' color='#938F99' sx={{ mr: '10.5rem', fontWeight: 'bold', fontSize: '21px', pt: '1rem' }}>Online Booking. Simple & Efficient.</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between' flexWrap='wrap'>
                    <Box sx={{ width: '38rem', py: '3rem' }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#F16A67', fontSize: '36px' }}>Sign Up</Typography>
                        {isErrorRegister && !isLoading && <Typography id='hideMe' align='center' sx={{ color: '#fff', backgroundColor: 'red', mt: '2rem', py: '0.4rem' }}>{message}</Typography>}
                        <form onSubmit={formik.handleSubmit}>
                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <TextField
                                    fullWidth
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    type='email'
                                    name="email"
                                    size='small'
                                    label="Email"
                                    variant="outlined"
                                    sx={{ mt: '2.5rem' }} />
                                <GrMail
                                    style={formik.touched.email && formik.errors.email ? { position: 'absolute', bottom: 32, right: 7, fontSize: '1.3rem' } :
                                        { position: 'absolute', bottom: 8, right: 8, fontSize: '1.3rem' }} />
                            </Box>
                            <TextField
                                fullWidth
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                type='text'
                                name="firstName"
                                size='small'
                                label="First Name"
                                variant="outlined"
                                sx={{ mt: '1.7rem' }} />
                            <TextField
                                fullWidth
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                type='text'
                                name="lastName"
                                size='small'
                                label="Last Name"
                                variant="outlined"
                                sx={{ mt: '1.7rem' }} />
                            <TextField
                                fullWidth
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                type='text'
                                name="username"
                                size='small'
                                label="Username"
                                variant="outlined"
                                sx={{ mt: '1.7rem' }} />
                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <TextField
                                    fullWidth
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    size='small'
                                    label="Password"
                                    variant="outlined"
                                    sx={{ mt: '1.7rem' }} />
                                <GrFormView onClick={() => setShowPassword(prevState => !prevState)}
                                    style={formik.touched.password && formik.errors.password && formik.errors.password.length > 100 ? { position: 'absolute', bottom: 48, right: 2, fontSize: '1.8rem', cursor: 'pointer' } : formik.touched.password && formik.errors.password && formik.errors.password.length < 100 ? { position: 'absolute', bottom: 28, right: 2, fontSize: '1.8rem', cursor: 'pointer' } :
                                        { position: 'absolute', bottom: 5, right: 2, color: '#F16A67', fontSize: '1.8rem', cursor: 'pointer' }} />
                            </Box>
                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <TextField
                                    fullWidth
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    size='small'
                                    label="Confirm Password"
                                    variant="outlined"
                                    sx={{ mt: '1.7rem' }} />
                                <GrFormView onClick={() => setShowConfirmPassword(prevState => !prevState)}
                                    style={formik.touched.confirmPassword && formik.errors.confirmPassword ? { position: 'absolute', bottom: 28, right: 2, fontSize: '1.8rem', cursor: 'pointer' } :
                                        { position: 'absolute', bottom: 5, right: 2, color: '#F16A67', fontSize: '1.8rem', cursor: 'pointer' }} />
                            </Box>
                            <TextField
                                fullWidth
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                type='text'
                                name="phoneNumber"
                                size='small'
                                label="Phone Number"
                                variant="outlined"
                                sx={{ mt: '1.7rem' }} />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained' sx={{ mt: '2.3rem', mb: '1.5rem', textTransform: 'none', fontSize: '18px', backgroundColor: '#F16A67' }}>Sign Up</Button>
                        </form>
                        <Typography variant='paragraph'>You have an account?
                            <Typography variant='span' sx={{ fontWeight: 'bold', ml: '0.7rem' }}>
                                <Link to='/sign-in' style={{ color: '#F16A67', textDecoration: 'none' }}>
                                    Sign In
                                </Link>
                            </Typography>
                        </Typography>
                    </Box>
                    <img src={process.env.PUBLIC_URL + '/assets/sign-in.png'} style={{ height: '34rem', width: '39rem', paddingTop: '7.5rem' }} alt='Hero'></img>
                </Box>
            </Container >
            <hr className="vline" />
        </ThemeProvider>
    );
}

export default Register
