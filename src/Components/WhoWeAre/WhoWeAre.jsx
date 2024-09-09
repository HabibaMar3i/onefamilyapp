import React from 'react';
import { Box, Typography } from '@mui/material';
import './WhoWeAre.css';

const WhoWeAre = () => {
    return (
        <Box className="who-we-are-container">
            <Typography variant="h4" component="h1" gutterBottom className="who-we-are-heading">
                Who We Are
            </Typography>
            <Typography variant="body1" paragraph className="who-we-are-text">
                One Family is a dedicated platform committed to supporting parents and children who face diverse challenges, including social disorders, disabilities, and postpartum depression. Our mission is to foster an environment of understanding, empathy, and genuine support, ensuring that every family feels valued and embraced.
            </Typography>
            <Typography variant="body1" paragraph className="who-we-are-text">
                We believe in the power of community and the importance of providing comprehensive resources to those who need them most. Our platform offers a range of services designed to support families through various stages of their journey, from expert medical advice to community-building events.
            </Typography>
        </Box>
    );
};

export default WhoWeAre;

