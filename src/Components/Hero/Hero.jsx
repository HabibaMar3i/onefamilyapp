import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Hero.css';
import hero1 from './../../Assets/hero1.jpg'; 
import hero2 from './../../Assets/hero2.jpg';

const Hero = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    return (
        <div className="hero-section-container">
            <div className="hero-section-content container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md-3" data-aos="fade-right">
                        <img src={hero1} alt="hero" className="hero-img img-fluid rounded-start hero-img-left" />
                    </div>
                    <div className="col-md-6 text-center" data-aos="zoom-in">
                        <div className="hero-text">
                            <p className='welcome-text'>Welcome To One Family</p>
                            <h1>Home For Your Special Child</h1>
                            <p>Empowering Families, Embracing Diversities</p>
                            <p>Join One Family, where every child is valued, and every parent is supported.</p>
                            <button className="btn btn-dark btn-learmore">Learn More</button>
                        </div>
                    </div>
                    <div className="col-md-3" data-aos="fade-left">
                        <img src={hero2} alt="hero" className="hero-img img-fluid rounded-end hero-img-right" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
