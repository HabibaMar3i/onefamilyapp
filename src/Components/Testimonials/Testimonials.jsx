import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './Testimonials.css';

const Testimonials = () => {
    const [testimonials] = useState([
        {
            content: "One Family has been a beacon of hope for us. The personalized consultation services have made a remarkable difference in my child's progress.",
            parent_name: "Laila M.",
            title: "Brandon Parent",
        },
        {
            content: "The community events organized by One Family have given my son the confidence to interact with other kids. It’s heartwarming to see him smile so much.",
            parent_name: "Ahmed S.",
            title: "Elsa Parent",
        },
        {
            content: "As a mother dealing with postpartum depression, the support I received from One Family was invaluable. The resources and counseling sessions were exactly what I needed.",
            parent_name: "Fatima H.",
            title: "Parent",
        },
        {
            content: "The skill development programs are fantastic! My daughter loves the activity kits, and I can see her growing more confident and creative each day.",
            parent_name: "Omar A.",
            title: "Parent",
        },
        {
            content: "Being a part of the One Family community has been a transformative experience. The private support groups have provided me with the empathy and understanding I desperately needed.",
            parent_name: "Nabil F.",
            title: "Parent",
        },
        {
            content: "The exclusive webinars and podcasts have been incredibly informative and helpful. I’ve learned so much about managing my child’s needs more effectively.",
            parent_name: "Mona E.",
            title: "Parent",
        }
    ]);

    const [current, setCurrent] = useState(0);
    const testimonialsPerPage = 3;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + testimonialsPerPage) % testimonials.length);
        }, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handleNext = () => {
        setCurrent((prev) => (prev + testimonialsPerPage) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrent((prev) => (prev - testimonialsPerPage + testimonials.length) % testimonials.length);
    };

    const getCurrentTestimonials = () => {
        const end = current + testimonialsPerPage;
        if (end <= testimonials.length) {
            return testimonials.slice(current, end);
        }
        return testimonials.slice(current).concat(testimonials.slice(0, end - testimonials.length));
    };

    return (
        <Box className="testimonials-section-container">
            <Box className="testimonials-section-content">
                <Typography variant="h6" className="testimonials-section-title">Testimonials</Typography>
                <Typography variant="h1" className="testimonials-section-heading">What Parents Say</Typography>
                <Typography variant="body1" className="testimonials-section-description">Here’s what our community has to say about their experiences with One Family:</Typography>
                <Box className="testimonial-slider">
                    <IconButton onClick={handlePrev} className="testimonial-nav-btn">
                        <ArrowBackIos />
                    </IconButton>
                    <Box className="testimonial-cards-container">
                        {getCurrentTestimonials().map((testimonial, index) => (
                            <Box key={index} className="testimonial-card">
                                <Box className="testimonial-rating">
                                    {[...Array(5)].map((star, i) => (
                                        <i key={i} className={`fas fa-star ${i < 4 ? 'filled' : 'half'}`}></i>
                                    ))}
                                </Box>
                                <Box className="testimonial-info">
                                    <Typography variant="h5">{testimonial.parent_name}</Typography>
                                    <Typography className="testimonial-content">{testimonial.content}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <IconButton onClick={handleNext} className="testimonial-nav-btn">
                        <ArrowForwardIos />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Testimonials;


