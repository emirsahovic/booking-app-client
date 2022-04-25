import { Box, Typography } from '@mui/material';
import Rating from './Rating';
import { MdLocationOn, MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AccommodationFilterItem = ({ acc }) => {
    return (
        <Box display='flex' sx={{ height: '18.5rem', width: '100%', mb: '2.5rem', border: '1px solid #B7B5B566', borderRadius: '10px', boxShadow: '0px 6px 18px -15px #111', px: '1.5rem', py: '1rem' }}>
            <Box sx={{ mr: '1.5rem' }}>
                <img style={{ width: '20rem', height: '100%', borderRadius: '10px' }} src={acc.images[0].url} />
            </Box>
            <Box>
                <Typography sx={{ fontSize: '22px', fontWeight: '600' }}>{acc.name}</Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Box display='flex' alignItems='center'>
                        <Rating value={acc.stars} color={'rgb(233, 225, 45)'} />
                    </Box>
                    <Typography sx={{ fontSize: '30px', fontWeight: '600', color: '#F16A67', ml: '18rem' }}>{acc.price}KM/d</Typography>
                </Box>
                <Typography sx={{ fontSize: '16px', fontWeight: '600', my: '1.5rem' }}>{acc.location}</Typography>
                <Typography sx={{ fontSize: '16px', fontWeight: '600', my: '1.5rem' }}>250m from centre</Typography>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Box display='flex' alignItems='center' sx={{ mt: '1.5rem' }}>
                        <MdLocationOn size={30} style={{ marginRight: '0.7rem' }} />
                        <Typography sx={{ fontSize: '22px', fontWeight: '600' }}>Address: {acc.address}</Typography>
                    </Box>
                    <Link to={`/accommodation/${acc.id}`}>
                        <MdArrowForwardIos className="btn-hover" size={35} style={{ paddingRight: '0.5rem', marginTop: '2rem', color: '#F16A67', fontWeight: 'bold', cursor: 'pointer' }} />
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default AccommodationFilterItem
