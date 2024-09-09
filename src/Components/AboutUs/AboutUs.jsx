import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './AboutUs.css';
import ContactUs from '../ContactUs/ContactUs';
import VisionMission from '../VisionMission/VisionMission';
import OurServices from '../OurServices/OurServices';
import OurTeam from '../OurTeam/OurTeam';
import WhoWeAre from '../WhoWeAre/WhoWeAre';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div>
      <div className="text-center">
        <h2 className="custom-heading" data-aos="fade-up">About Us</h2>
        <div className='who-we-are' data-aos="fade-up"><WhoWeAre /></div>
        <div data-aos="fade-up"><VisionMission /></div>
        <div data-aos="fade-up"><OurTeam /></div>
        <div data-aos="fade-up"><OurServices /></div>
        <div data-aos="fade-up"><ContactUs /></div>
      </div>
    </div>
  );
};

export default AboutUs;