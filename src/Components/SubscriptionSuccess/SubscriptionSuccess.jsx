import React, { useEffect } from 'react';
import './SubscriptionSuccess.css';
import toast, { Toaster } from 'react-hot-toast';

const SubscriptionSuccess = () => {
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const id = localStorage.getItem('subscription_id');
        if (id !== '2') {
            localStorage.setItem('subscription_id', '2');
            toast.success('You have successfully subscribed to the premium plan!');
        }
    }, []);

    return (
        <div className="subscription-container">
            <Toaster />
            <div className="text-center my-5">
                <p className="pricing-header">Our Pricing</p>
                <h1 className="pricing-title">Affordable Pricing Plan</h1>
                <p className="pricing-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam dolore aliqua.
                </p>
            </div>
            <div className="pricing-cards-container">
                <div className="pricing-card intro-package">
                <h3>Intro Package</h3>
                    <h2>FREE</h2>
                    <ul>
                        <li><i className="fas fa-check"></i> Articles and Blogs</li>
                        <li><i className="fas fa-check"></i> Community Events</li>
                        <li><i className="fas fa-check"></i> Resource Library</li>
                        <li><i className="fas fa-check"></i> Printable Resources</li>
                        <li><i className="fas fa-check"></i> Event Listings</li>
                        <li><i className="fas fa-check"></i> Postpartum Resources</li>
                        <li><i className="fas fa-check"></i> Basic Account Management</li>
                        <li><i className="fas fa-check"></i> Newsletter Subscription</li>
                    </ul>
                    <button className="pricing-button" onClick={() => localStorage.setItem('subscription_id', '1')}>
                        Return to Free Plan
                    </button>
                </div>
                <div className="pricing-card premium-package">
                <h3>Premium Package</h3>
                    <h2>200 EGP</h2>
                    <p>Includes everything in the Free Plan and:</p>
                    <ul>
                        <li><i className="fas fa-check"></i> Exclusive Podcasts</li>
                        <li><i className="fas fa-check"></i> Educational Videos</li>
                        <li><i className="fas fa-check"></i> Discounted Appointments</li>
                        <li><i className="fas fa-check"></i> Event Discounts</li>
                        <li><i className="fas fa-check"></i> Product Offers</li>                    </ul>
                    <button className="pricing-button-free" disabled>Your current plan</button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionSuccess;
