import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { Container, Grid, Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Footer from "../components/Footer";

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#F16A67',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#F16A67',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'gray',
        },
        '&:hover fieldset': {
            borderColor: '#F16A67',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#F16A67',
        },
    },
})

const ContactUs = () => {
    return (
        <>
            <NavigationBar />
            <Container maxWidth='xl'>
                <Box
                    className='Helllo'

                    px={{ xs: 0, sm: 0 }}
                    py={{ xs: 0, sm: 0 }}

                    mx={{ xs: 0, sm: 0 }}
                    my={{ xs: 0, sm: 0 }}
                    sx={{
                        color: '#323642',
                    }}
                >

                    <Grid
                        container columnSpacing={20}
                        sx={{

                        }}
                    >
                        <Grid item xs='12' sm='6'>
                            <Box>
                                <Typography variant='h2' fontWeight='bold'>
                                    Contact us
                                </Typography>
                                <Grid
                                    container rowSpacing={10}
                                    sx={{
                                        marginLeft: '10px',
                                        marginTop: '1px'
                                    }}
                                >
                                    <Grid item xs='6'>
                                        <Box>
                                            <Typography variant='body1' fontWeight='bold'>
                                                Address
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs='6'>
                                        <Box
                                            display='flex'
                                        >
                                            <LocationOnIcon />
                                            <Typography variant='body1'>
                                                Fakultetska 1, Zenica
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs='6'>
                                        <Box>
                                            <Typography variant='body1' fontWeight='bold'>
                                                Phone number
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs='6'>
                                        <Box>
                                            <Box
                                                display='flex'
                                            >
                                                <PhoneEnabledIcon />
                                                <Typography variant='body1' marginLeft='1em'>
                                                    032/556-665
                                                </Typography>
                                            </Box>
                                            <Box
                                                display='flex'
                                            >
                                                <PhoneEnabledIcon />
                                                <Typography variant='body1' marginLeft='1em'>
                                                    062/562-652
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs='6'>
                                        <Box>
                                            <Typography variant='body1' fontWeight='bold'>
                                                Follow us on
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs='6' textAlign='center'>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}

                                        >
                                            <Box>
                                                <FacebookIcon />
                                                <Typography variant='body1'>
                                                    Facebook
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <InstagramIcon />
                                                <Typography variant='body1'>
                                                    Instagram
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <TwitterIcon />
                                                <Typography variant='body1'>
                                                    Twitter
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs='12' sm='6'>
                            <Box
                                display='list-item'
                            >
                                <CustomTextField fullWidth id="outlined-basic" label="Full name" variant="outlined"
                                    sx={{
                                        marginTop: '9em',
                                    }}
                                />
                                <CustomTextField fullWidth id="outlined-basic" label="Email adress" variant="outlined"
                                    sx={{
                                        marginTop: '2em',
                                    }}
                                />
                                <CustomTextField fullWidth id="outlined-basic" label="Comment" variant="outlined" multiline={true} rows={5}
                                    sx={{
                                        marginTop: '2em',
                                        height: '10em'
                                    }}
                                />
                                <Button fullWidth variant="contained"
                                    sx={{
                                        marginTop: '2em',
                                        mb: '6rem',
                                        backgroundColor: '#F16A67',
                                        height: '3em',
                                        textTransform: 'none'
                                    }}
                                >Send message</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </>
    )
}

export default ContactUs;