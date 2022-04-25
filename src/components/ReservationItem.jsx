import { Box, Typography } from "@mui/material"
import { MdLocationOn } from 'react-icons/md';
import Rating from "./Rating";

const ReservationItem = ({ accommodation }) => {
    return (
        <Box display='flex' flexDirection='column' sx={{ width: '21.5rem', minHeight: '20rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)' }}>
            <img src={accommodation.images && accommodation.images[0].url} style={{ borderRadius: '10px', minHeight: '65%' }} />
            <Typography variant='h5' sx={{ fontWeight: '600', pl: '1rem', pt: '0.7rem' }}>{accommodation.name}</Typography>
            <Box display='flex' justifyContent='space-between' sx={{ my: '0.5rem', pl: '1rem' }}>
                <Box display='flex' alignItems='center'>
                    <Rating value={accommodation.stars} color={'rgb(233, 225, 45)'} />
                </Box>
            </Box>
            <Typography variant='body1' sx={{ pl: '1rem', fontWeight: '600', py: '0.7rem' }}>{accommodation.city}</Typography>
            <Box display='flex' justifyContent='space-between' sx={{ pt: '0.3rem' }}>
                <Box display='flex' alignItems='center' sx={{ pl: '1rem' }}>
                    <MdLocationOn style={{ color: '#434343', marginRight: '0.6rem' }} size={20} />
                    <Typography variant='paragraph' sx={{ fontWeight: '600' }}>Address: {accommodation.address}</Typography>
                </Box>
            </Box>
            <Box sx={{ pl: '1rem', py: '0.9rem' }}>
                <Typography variant='h6' color='#323642' sx={{ fontWeight: '600', fontSize: '18px' }}>Price:</Typography>
                <Typography variant='h6' color='#F16A67' sx={{ fontWeight: '600', fontSize: '24px' }}>{accommodation.price}KM/d</Typography>
            </Box>
        </Box>
    )
}

export default ReservationItem;
