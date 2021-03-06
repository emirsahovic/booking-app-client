import { Typography, Box, Container } from '@mui/material';
import NavigationBar from '../components/NavigationBar';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAccommodations } from '../redux/actions/accommodationActions';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AccommodationItem from '../components/AccommodationItem';

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <MdOutlineArrowForwardIos
                className='btn-hover'
                style={{ color: '#F16A67', cursor: 'pointer' }}
                size={40}
            />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <MdOutlineArrowBackIos
                className='btn-hover'
                style={{ color: '#F16A67', cursor: 'pointer' }}
                size={40}
            />
        </div>
    );
}

const Home = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        lazyLoad: true
    };

    const settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        lazyLoad: true
    };

    const { accommodations, isLoading, isSuccess } = useSelector(state => state.accommodation);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAccommodations());
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <NavigationBar />
            <Container maxWidth='xl'>
                <Box display='flex' justifyContent='space-between'>
                    <Box sx={{ width: '50%' }}>
                        <Typography sx={{ fontWeight: '500', fontSize: '4rem', lineHeight: '5.8rem' }}>Explore amazing accommodation <br /> with the best guide</Typography>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false} showArrows={false}>
                            <div>
                                <img src={'/assets/zenica.png'} style={{ height: '19.5rem', width: '36rem', marginLeft: '12.85rem' }} alt='Logo' />
                            </div>
                            <div>
                                <img src={'/assets/travnik.png'} style={{ height: '19.5rem', width: '36rem', marginLeft: '12.85rem' }} alt='Logo' />
                            </div>
                            <div>
                                <img src={'/assets/sarajevo.png'} style={{ height: '19.5rem', width: '36rem', marginLeft: '12.85rem' }} alt='Logo' />
                            </div>
                            <div>
                                <img src={'/assets/mostar.png'} style={{ height: '19.5rem', width: '36rem', marginLeft: '12.85rem' }} alt='Logo' />
                            </div>
                            <div>
                                <img src={'/assets/travnik.png'} style={{ height: '19.5rem', width: '36rem', marginLeft: '12.85rem' }} alt='Logo' />
                            </div>
                        </Carousel>
                    </Box>
                </Box>

                <Box sx={{ my: '3.2rem', mr: '1.5rem' }}>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: '600', mb: '2rem' }}>Popular Cities</Typography>
                    <Box sx={{ maxWidth: '87.5rem', margin: 'auto' }}>
                        <Slider {...settings}>
                            <div className='p-left'>
                                <img src={'/assets/mostar.png'} style={{ width: '30rem', height: '20rem' }} />
                                <Typography variant='h6' sx={{ ml: '2rem', mt: '-2rem' }}>Mostar</Typography>
                            </div>
                            <div className='p-left'>
                                <img src={'/assets/sarajevo.png'} style={{ width: '30rem', height: '20rem' }} />
                                <Typography variant='h6' sx={{ ml: '2rem', mt: '-2rem' }}>Sarajevo</Typography>
                            </div>
                            <div className='p-left'>
                                <img src={'/assets/travnik.png'} style={{ width: '30rem', height: '20rem' }} />
                                <Typography variant='h6' sx={{ ml: '2rem', mt: '-2rem' }}>Travnik</Typography>
                            </div>
                            <div className='p-left'>
                                <img src={'/assets/travnik.png'} style={{ width: '30rem', height: '20rem' }} />
                                <Typography variant='h6' sx={{ ml: '2rem', mt: '-2rem' }}>Jajce</Typography>
                            </div>
                            <div className='p-left'>
                                <img src={'/assets/travnik.png'} style={{ width: '30rem', height: '20rem' }} />
                                <Typography variant='h6' sx={{ ml: '2rem', mt: '-2rem' }}>Tuzla</Typography>
                            </div>
                            <div className='p-left'>
                                <img src={'/assets/travnik.png'} style={{ width: '30rem', height: '20rem' }} />
                                <Typography variant='h6' sx={{ ml: '2rem', mt: '-2rem' }}>Te??anj</Typography>
                            </div>
                        </Slider>
                    </Box>
                </Box>
                <Box sx={{ my: '5rem', mr: '1.5rem' }}>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: '600', mb: '2.7rem' }}>Popular Accommodations</Typography>
                    <Box sx={{ maxWidth: '87.5rem', margin: 'auto' }}>
                        <Slider {...settings2}>
                            {accommodations && accommodations.responseAccommodations && accommodations.responseAccommodations.map((acc, index) => (
                                <AccommodationItem key={index} acc={acc} />
                            ))}
                        </Slider>
                    </Box>
                    <Box sx={{ my: '5rem' }} display='block' textAlign='center'>
                        <Link to='/accommodations' className='btn-hover' style={{ backgroundColor: '#F16A67', color: '#fff', padding: '0.7rem 5rem', borderRadius: '4px' }}>View All</Link>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </>
    )
}

export default Home;
