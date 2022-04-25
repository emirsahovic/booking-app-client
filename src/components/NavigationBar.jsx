import { Container, Box, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F16A67'
        }
    }
});

const NavigationBar = () => {
    const { pathname } = useLocation();
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/sign-in');
    }

    const routeMatch = (url) => {
        if (pathname === url) return true;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='xl' sx={{ marginBottom: '2.6rem' }}>
                <Box display='flex' alignItems='center' sx={{ py: '1.2rem' }} justifyContent='space-between'>
                    <Link to='/'>
                        <img src={process.env.PUBLIC_URL + '/assets/zebooklogo.png'} style={{ maxHeight: '6rem', maxWidth: '12rem' }} alt='Logo' />
                    </Link>
                    <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', fontSize: '20px' }}>
                        <Link to='/' style={{ paddingRight: '2.3rem' }} className={`${routeMatch('/') && 'prim-color'}`}>Home</Link>
                        <Link to='/about' style={{ paddingRight: '2.3rem' }} className={`${routeMatch('/about') && 'prim-color'}`}>About Us</Link>
                        <Link to='/contact' style={{ paddingRight: '2.3rem' }} className={`${routeMatch('/contact') && 'prim-color'}`}>Contact</Link>
                        {!user ?
                            <>
                                <Link to='/sign-in' style={{ paddingRight: '2.3rem' }}>Sign In</Link>
                                <Link to='/sign-up' style={{ color: '#fff', backgroundColor: '#F16A67', borderRadius: '5px', padding: '4px 20px 4px' }} className='btn-hover'>Sign Up</Link>
                            </>
                            :
                            <button className='btn-hover' style={{ border: 'none', cursor: 'pointer', borderRadius: '4px', textTransform: 'none', color: '#fff', fontWeight: '600', fontSize: '20px', backgroundColor: '#F16A67', padding: '0.4rem 1.5rem' }} onClick={handleLogout}>
                                Logout
                            </button>
                        }
                    </ul>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default NavigationBar;
