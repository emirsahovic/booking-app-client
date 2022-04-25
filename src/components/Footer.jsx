import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Typography, CardMedia, ThemeProvider } from '@mui/material';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: 'body1'
                    },
                    style: {
                        fontWeight: 'bold'
                    }
                }
            ]
        }
    },
    typography: {
        fontFamily: [
            'Poppins',
        ]
    }
})


const Footer = () => {
    return (
        <ThemeProvider theme={Theme}>
            <Box
                sx={{
                    backgroundColor: '#393939',
                    color: 'white',
                    py: '4rem'
                }}
            >
                <Container>
                    <Grid
                        container spacing={5}
                        sx={{
                        }}
                    >
                        <Grid item xs='12' sm='2'>
                            <Box
                                sx={{
                                }}
                            >
                                <Typography variant='body1' marginBottom={2}>
                                    Zebook
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <PhoneEnabledIcon style={{ paddingRight: '0.2rem' }} />
                                    <Typography variant='body2' sx={{ lineHeight: '2.2rem' }}>
                                        032/556-665
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <PhoneEnabledIcon style={{ paddingRight: '0.2rem' }} />
                                    <Typography variant='body2' sx={{ lineHeight: '2.2rem' }}>
                                        032/556-665
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs='12' sm='2'>
                            <Box
                                sx={{
                                }}
                            >
                                <Typography variant='body1' marginBottom={2}>
                                    Location
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                    }}
                                >
                                    <Typography variant='body2' sx={{ lineHeight: '2.2rem' }}>
                                        Fakultetska 1, Zenica
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                    }}
                                >
                                    <Typography variant='body2'>
                                        Bosna i Hercegovina
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs='12' sm='4' textAlign='center'>
                            <CardMedia
                                image={process.env.PUBLIC_URL + '/assets/zebooklogo.png'}
                                component="img"
                                sx={{
                                    maxWidth: '12rem',
                                    maxHeight: '7rem',
                                    objectFit: 'contain',
                                    marginLeft: '20%'
                                }}
                                alt="logo"
                            />
                        </Grid>
                        <Grid item xs='12' sm='2'>
                            <Box
                                sx={{
                                }}
                            >
                                <Typography variant='body1' marginBottom={2}>
                                    Links
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                    }}
                                >
                                    <Link to='/' className='btn-hover'>
                                        <Typography variant='body2' sx={{ lineHeight: '2rem', color: '#fff' }}>
                                            Home
                                        </Typography>
                                    </Link>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                    }}
                                >
                                    <Link to='/about' className='btn-hover'>
                                        <Typography variant='body2' sx={{ lineHeight: '2rem', color: '#fff' }}>
                                            About us
                                        </Typography>
                                    </Link>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                    }}
                                ><Link to='/contact' className='btn-hover'>
                                        <Typography variant='body2' sx={{ lineHeight: '2rem', color: '#fff' }}>
                                            Contact
                                        </Typography>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs='12' sm='2'>
                            <Box
                                sx={{
                                }}
                            >
                                <Typography variant='body1' marginBottom={2}>
                                    Social media
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                    }}
                                ><a href='https://www.facebook.com' rel='noreferrer' target='_blank' className='btn-hover'>
                                        <Typography variant='body2' sx={{ lineHeight: '2rem', color: '#fff' }}>
                                            Facebook
                                        </Typography>
                                    </a>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                    }}
                                ><a href='https://www.instagram.com' rel='noreferrer' target='_blank' className='btn-hover'>
                                        <Typography variant='body2' sx={{ lineHeight: '2rem', color: '#fff' }}>
                                            Instagram
                                        </Typography>
                                    </a>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                    }}
                                ><a href='https://www.twitter.com' rel='noreferrer' target='_blank' className='btn-hover'>
                                        <Typography variant='body2' sx={{ lineHeight: '2rem', color: '#fff' }}>
                                            Twitter
                                        </Typography>
                                    </a>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box textAlign='center' sx={{ mt: '1.8rem' }}>
                        <Typography variant='paragraph' sx={{ fontWeight: '300' }}>© 2022. All rights reserved.</Typography>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider >
    )
}

export default Footer;