import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, reset } from '../redux/actions/authActions';
import * as Yup from 'yup';

import { getRememberUser, setRememberUser, removeRememberUser } from '../utils/auth/auth';

import { Container, Box, Typography, TextField, Button, Checkbox } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import Spinner from '../components/Spinner';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F16A67'
        }
    }
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rememberUser = getRememberUser();
    const { user, isSuccessLogin, isErrorLogin, isLoading, message } = useSelector(state => state.auth);

    const formik = useFormik({
        initialValues: {
            username: rememberUser.username || '',
            password: rememberUser.password || '',
            remember: rememberUser.username !== null
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: (values, { resetForm }) => {
            const { username, password } = values;
            const userData = { username, password };
            dispatch(loginUser(userData));
            if (values.remember) setRememberUser(values.username, values.password);
            else removeRememberUser();

            if (isSuccessLogin || user) {
                resetForm({ values: '' });
            }
        }
    })

    const handleClick = () => {
        navigate('/');
    }

    useEffect(() => {
        if (isSuccessLogin) {
            navigate('/');
        }

        dispatch(reset());
    }, [isSuccessLogin, navigate])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='xl'>
                <Box display='flex' justifyContent='space-between' sx={{ pt: '1rem' }}>
                    <img src={process.env.PUBLIC_URL + '/assets/zebooklogo.png'} style={{ maxHeight: '7rem', maxWidth: '14rem' }} alt='Logo' />
                    <Typography variant='subtitle1' color='#938F99' sx={{ mr: '10.5rem', fontWeight: 'bold', fontSize: '21px', pt: '1rem' }}>Online Booking. Simple & Efficient.</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Box sx={{ width: '38rem', pt: '2rem' }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#F16A67', fontSize: '36px' }}>Sign In</Typography>
                        {isErrorLogin && !isLoading && <Typography id='hideMe' align='center' sx={{ color: '#fff', backgroundColor: '#F16A67', mt: '1.5rem', py: '0.4rem', fontWeight: '600', borderRadius: '4px' }}>{message}</Typography>}
                        <form onSubmit={formik.handleSubmit} style={{ marginTop: '2.5rem' }}>
                            <TextField
                                fullWidth
                                defaultValue={rememberUser.username || ""}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                type='text'
                                name="username"
                                size='small'
                                label="Username"
                                variant="outlined"
                                sx={{ mt: '1.5rem' }} />
                            <TextField
                                fullWidth
                                defaultValue={rememberUser.password || ""}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                type='password'
                                name="password"
                                size='small'
                                label="Password"
                                variant="outlined"
                                sx={{ mt: '1.5rem' }} />
                            <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ mt: '1.3rem', color: '#323642' }}>
                                <Box display='flex' alignItems='center'>
                                    <Checkbox name='remember' defaultChecked={rememberUser.username !== null} onChange={formik.handleChange} />
                                    <Typography variant='paragraph'>Remember me</Typography>
                                </Box>
                                <Button
                                    onClick={handleClick}
                                    type='submit'
                                    sx={{ textTransform: 'none', fontSize: '16px', color: '#323642' }}>
                                    Sign In As Guest
                                </Button>
                            </Box>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: '8rem', mb: '1.5rem', textTransform: 'none', fontSize: '18px' }}>
                                Sign In
                            </Button>
                        </form>
                        <Typography variant='paragraph'>Don't have an account?
                            <Typography variant='span' sx={{ fontWeight: 'bold', ml: '0.5rem' }}>
                                <Link to='/sign-up' style={{ color: '#F16A67', textDecoration: 'none' }}>
                                    Sign Up
                                </Link>
                            </Typography>
                        </Typography>
                    </Box>
                    <img src={process.env.PUBLIC_URL + '/assets/sign-in.png'} style={{ height: '34rem', width: '39rem', paddingTop: '6.5rem', paddingBottom: '3rem' }} alt='Hero' />
                </Box >
            </Container>
            <hr className="vline" />
        </ThemeProvider>
    );
}

export default Login;
