import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { Container, Grid, Box, Typography, CardMedia, ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import Footer from "../components/Footer";

const Theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: 'h3'
                    },
                    style: {
                        fontSize: 30
                    }
                }
            ]
        }
    }
})

const AboutUs = () => {

    const position = [44.1993473, 17.903595]

    return (
        <>
            <NavigationBar />
            <Container maxWidth='xl'>
                <ThemeProvider theme={Theme}>
                    <Box
                        sx={{
                            color: '#323642'
                        }}
                    >
                        <Grid container spacing={5}>
                            <Grid item xs='12' sm='6'>
                                <Box>
                                    <Typography variant='h2' marginTop='1em'>
                                        About us
                                    </Typography>
                                    <Typography variant='body1' sx={{ mb: '20rem', mt: '1rem' }}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs='12' sm='6'>
                                <Box sx={{ ml: '9rem' }}>
                                    <Typography variant='h3' marginBottom='1em' marginTop='3em'>
                                        Our location
                                    </Typography>
                                    <img src={'/assets/mapa.png'} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </ThemeProvider>
            </Container>
            <Footer />
        </>
    )
}

export default AboutUs;