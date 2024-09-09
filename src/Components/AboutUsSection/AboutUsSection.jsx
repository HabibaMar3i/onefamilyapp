import React from 'react';
import './AboutUsSection.css';
import abtus1 from './../../Assets/abtus1.jpg'; // Ensure you have these images in your assets
import abtus2 from './../../Assets/abtus2.jpg';
import { Link } from 'react-router-dom';

const AboutUsSection = () => {
    return (
        <div className="aboutus-section-container">
            <div className="aboutus-section-content container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="aboutus-images">
                            <img src={abtus1} alt="Helping Children" className="aboutus-img img-fluid rounded-start" />
                            <div className="aboutus-stats">
                                <h3>50+</h3>
                                <p>Happy Patients</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="aboutus-text">
                            <h6>About Us</h6>
                            <h1>Helping Children Reach Their True Potential</h1>
                            <p>
                                One Family is dedicated to support parents and children facing diverse challenges, including social disorders, disabilities, and postpartum depression. Our mission is to foster understanding, provide essential resources, and create a welcoming community where every family feels seen, heard, and embraced.
                            </p>
                            {/* <ul>
                                <li>Duis aute irure dolor in reprehenderit in voluptate pariatur</li>
                                <li>Quis nostrud exercitation ullamco laboris nisi minim veniam</li>
                                <li>Nostrum exercitationem ullam corporis suscipit fugiat pariatur</li>
                            </ul> */}
                            <button className="btn btn-dark btn-learnmore"><Link to="/aboutus">More About Us</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;
