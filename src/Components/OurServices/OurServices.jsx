import React from 'react';
import './OurServices.css'

const services = [
  {
    title: 'Expert Advice',
    description: 'Access tips, articles, and blogs written by top psychologists and psychiatrists to help you navigate the complexities of parenting children with diverse needs.',
    icon: '🧠',
  },
  {
    title: 'Counseling Services',
    description: 'Book one-on-one consultations with our partnered specialists to receive guidance and support.',
    icon: '👥',
  },
  {
    title: 'Medication and Products',
    description: 'Purchase prescribed medications and products through our partnered pharmacies and suppliers with the convenience of home delivery.',
    icon: '💊',
  },
  {
    title: 'Creative Activities',
    description: 'Engage your child in skill-enhancing activities like coloring books and interactive learning tools designed to boost their creativity and cognitive development.',
    icon: '🎨',
  },
  {
    title: 'Various Resources',
    description: 'Access a wide range of resources, including podcasts, awareness videos, and articles that cover various topics related to mental health and child development.',
    icon: '📚',
  },
  {
    title: 'Inclusive Events',
    description: 'Attend events that bring together children with and without diversities, fostering social integration and breaking down societal barriers.',
    icon: '🎉',
  },
  {
    title: 'Supportive Community',
    description: 'Be part of a warm, accepting community where both parents and children can find emotional support, understanding, and companionship.',
    icon: '🤝',
  },
  {
    title: 'Awareness Campaigns',
    description: 'Join our efforts to raise awareness about various disorders and diversities through engaging and informative campaigns, including fun and educational cartoons.',
    icon: '📢',
  },
  {
    title: 'Postpartum Depression Support',
    description: 'Access dedicated resources for mothers dealing with postpartum depression, including counseling, coping strategies, and peer support.',
    icon: '🤱',
  }
];

const OurServices = () => {
  return (
    <div className="our-services bg-white p-4 rounded mb-4">
      <h3 className="section-title">Our Services</h3>
      <div className="row">
        {services.map((service, index) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={index}>
            <div className="card service-card h-100">
              <div className="card-body text-center">
                <h5 className="card-services-title">{service.icon} {service.title}</h5>
                <p className="card-services-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
