import React from 'react';
import './WhyUs.css';
import whyusImg from '../../Assets/whyus.jpg';
import whyusImg1 from '../../Assets/whyus2.jpg';

const WhyUs = () => {
    return (
        <div className="whychooseus-section-container">
            <div className="whychooseus-section-content container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="whychooseus-images">
                            <img src={whyusImg} alt="Impact" className="whychooseus-img img-fluid rounded-start mb-4" />
                            <img src={whyusImg1} alt="Impact" className="whychooseus-img img-fluid rounded-end" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="whychooseus-text">
                            <h6>Why Choose Us</h6>
                            <h1>Make An Impact At Any Age Of A Child</h1>
                            <p>
                                Choose us for our commitment to inclusivity, empowerment, and collaboration. We advocate for children's diverse needs with compassion and educate parents and caregivers to foster a supportive community.
                            </p>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="service-feature bg-orange">
                                        <i className="fas fa-hand-rock"></i>
                                        <h5>Empowerment</h5>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="service-feature bg-blue">
                                        <i className="fas fa-universal-access"></i>
                                        <h5>Inclusivity</h5>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="service-feature bg-green">
                                        <i className="fas fa-handshake"></i>
                                        <h5>Collaboration</h5>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="service-feature bg-yellow">
                                        <i className="fas fa-bullhorn"></i>
                                        <h5>Advocacy</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
