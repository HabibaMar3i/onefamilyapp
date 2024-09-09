import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutUsSection from "../AboutUsSection/AboutUsSection";
import FeedbackCarousel from "../Testimonials/Testimonials";
import Hero from "../Hero/Hero";
import Services from "../Services/Services";
import WhyUs from "../WhyUs/WhyUs";

function HomePage() {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            easing: 'ease-in-out', // Easing function
            once: true, // Whether animation should happen only once - while scrolling down
            mirror: false, // Whether elements should animate out while scrolling past them
        });
    }, []);

    return (
        <>
            <div data-aos="fade-up">
                <Hero />
            </div>
            <div data-aos="fade-up">
                <AboutUsSection />
            </div>
            <div data-aos="fade-up">
                <Services />
            </div>
            <div data-aos="fade-up">
                <WhyUs />
            </div>
            <div data-aos="fade-up">
                <FeedbackCarousel />
            </div>
        </>
    );
}

export default HomePage;
