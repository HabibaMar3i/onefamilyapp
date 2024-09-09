import React from 'react';
import './Services.css';
import service1 from '../../Assets/service1.jpg';
import service2 from '../../Assets/service2.jpg';
import service3 from '../../Assets/service3.jpg';
import service4 from '../../Assets/service4.jpg';
import service5 from '../../Assets/service5.jpg';
import service6 from '../../Assets/service6.jpg';

const services = [
    {
        title: "Expert Advice",
        description: "Access tips and articles from top psychologists and psychiatrists.",
        imageUrl: service1,
    },
    {
        title: "Counseling Services",
        description: "Book one-on-one consultations with our specialists for tailored support.",
        imageUrl: service2,
    },
    {
        title: "Medication and Products",
        description: "Buy prescribed medications and products with home delivery.",
        imageUrl: service3,
    },
    {
        title: "Postpartum Support",
        description: "Access resources for postpartum depression, including counseling, coping strategies, and peer support.",
        imageUrl: service4,
    },
    {
        title: "Creative Activities",
        description: "Enhance skills with coloring books and interactive learning tools.",
        imageUrl: service5,
    },
    {
        title: "Various Resources",
        description: "Access podcasts, videos, and articles on mental health and child development.",
        imageUrl: service6
    }
];

const Services = () => {
    return (
        <div className="services-section-container">
            <div className="services-section-content container">
                <div className="text-center mb-5">
                    <h6 className="section-subtitle">Our Service</h6>
                    <h2 className="section-title">What Service We Offer</h2>
                    <p className="section-description">We offer a wide range of services to support children with diverse needs and their families.</p>
                </div>
                <div className="row">
                    {services.map((service, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="service-card">
                                <img src={service.imageUrl} alt={service.title} className="service-image img-fluid" />
                                <div className="service-info">
                                    <h5 className="service-title text-center">{service.title}</h5>
                                    <p className="service-description">{service.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;


