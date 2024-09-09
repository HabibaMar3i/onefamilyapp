import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import './Disorders.css';
import ocdImage from './../../Assets/ocd.png';
import adhdImage from './../../Assets/adhd.png';
import eatingDisorderImage from './../../Assets/eating_disorder.png'; // Assuming you have an image for eating disorders
import depressionImage from './../../Assets/depression.png'; // Assuming you have an image for depression
import adhdtext from './../../Assets/adhdcarousel.png'
import edtext from './../../Assets/edcarousel.png'
import ocdtext from './../../Assets/ocdcarousel.png'
import depressiontext from './../../Assets/depressioncarousel.png'

const disordersData = [
    {
        id: 1,
        title: "OCD with Ariel",
        description: "Obsessive compulsive disorder (OCD) usually begins in late childhood or early adolescence...",
        imageUrl: ocdImage,
        imagetextUrl: ocdtext
    },
    {
        id: 2,
        title: "ADHD with Tigger",
        description: "People with ADHD have physical characteristics in their brains that lead to symptoms...",
        imageUrl: adhdImage,
        imagetextUrl: adhdtext
    },
    {
        id: 3,
        title: "Eating Disorders with Pooh",
        description: "Eating disorders are serious health conditions that affect both your physical and mental health...",
        imageUrl: eatingDisorderImage,
        imagetextUrl: edtext
    },
    {
        id: 4,
        title: "Depression with Squidward",
        description: "Childhood depression is different from the normal \"blues\" and everyday emotions that children go through...",
        imageUrl: depressionImage,
        imagetextUrl: depressiontext
    }
];

// Helper function to split the data into pairs
const pairDisorders = (data) => {
    const pairedData = [];
    for (let i = 0; i < data.length; i += 2) {
        pairedData.push(data.slice(i, i + 2));
    }
    return pairedData;
};

const Disorders = () => {
    const pairedDisorders = pairDisorders(disordersData);

    return (
        <div className="disorder-list-container container my-5">
            <h2 className="custom-heading">Disorders with Characters</h2>
            {pairedDisorders.map((pair, index) => (
                <div className="row my-3" key={index}>
                    {pair.map(disorder => (
                        <div className="col-md-6" key={disorder.id}>
                            <Carousel>
                                <Carousel.Item>
                                    <div className="disorder-text-card">
                                        <img src={disorder.imagetextUrl} alt={disorder.title} />
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className="disorder-card">
                                        <img src={disorder.imageUrl} alt={disorder.title} className="disorder-image" />
                                        <div className="disorder-info">
                                            <h5 className="disorder-title">{disorder.title}</h5>
                                            <p className="disorder-description">{disorder.description}</p>
                                            <Link to={`/disorders/${disorder.id}`} className="read-more">Read More ➔</Link>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Disorders;
