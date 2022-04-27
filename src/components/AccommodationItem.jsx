import { Box, Typography } from "@mui/material"
import { MdLocationOn, MdArrowForwardIos } from 'react-icons/md';
import { Link } from "react-router-dom";
import Rating from "./Rating";

const AccommodationItem = ({ acc }) => {
    return (
        <Box display='flex' flexDirection='column' sx={{ pb: '4.2rem', mb: '3rem', ml: '2.2rem', width: '19rem', height: '20rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
            <img src={acc.images[0].url} style={{ borderRadius: '10px', minHeight: '65%' }} />
            <Typography variant='h5' sx={{ fontWeight: '600', pl: '1rem', pt: '0.7rem' }}>{acc.name}</Typography>
            <Box display='flex' justifyContent='space-between' sx={{ my: '0.5rem', pl: '1rem' }}>
                <Box display='flex' alignItems='center'>
                    <Rating value={acc.stars} color={'rgb(233, 225, 45)'} />
                </Box>
                <Typography variant='h6' color='#F16A67' sx={{ fontWeight: '600', fontSize: '24px', pr: '0.9rem' }}>{acc.price}KM/d</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' sx={{ pt: '0.3rem' }}>
                <Box display='flex' alignItems='center' sx={{ pl: '1rem' }}>
                    <MdLocationOn style={{ color: '#434343', marginRight: '0.6rem' }} size={20} />
                    <Typography variant='paragraph' sx={{ fontWeight: '600' }}>Address: {acc.address}</Typography>
                </Box>
                <Link to={`/accommodation/${acc.id}`}>
                    <MdArrowForwardIos className="btn-hover" size={35} style={{ paddingRight: '0.7rem', color: '#F16A67', fontWeight: 'bold' }} />
                </Link>
            </Box>
        </Box>
    )
}

export default AccommodationItem
