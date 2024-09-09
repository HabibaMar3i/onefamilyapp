import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Sessions.css'; // Import custom CSS for styling

function Sessions() {
    const [sessionsWithDoctors, setSessionsWithDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/sessions');
                setSessionsWithDoctors(response.data.sessions_with_doctors);
            } catch (error) {
                console.error('Error fetching sessions:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessions();
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    const reserveSession = async (sessionId) => {
        try {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                throw new Error('User-Id is missing from local storage');
            }

            const response = await axios.post(`http://127.0.0.1:8000/api/cart/sessionToCart?session_id=${sessionId}`, null, {
                headers: {
                    'User-Id': userId
                }
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Session reserved successfully');
        } catch (error) {
            console.error('Error reserving session:', error);
            toast.error('Failed to reserve session');
        }
    };

    if (isLoading) {
        return <div className="text-center loader-container">
            <ClipLoader color="#D85207" size={80} />
            <p className="loading-text">Loading...</p>
        </div>;
    }

    if (isError) {
        return <div className="text-center text-danger">An error has occurred</div>;
    }

    return (
        <div className="container sessions-container">
            <h2 className="custom-heading" data-aos="fade-up">
                All Doctor Sessions
            </h2>
            <div className="row">
                {sessionsWithDoctors.length > 0 ? (
                    sessionsWithDoctors.map((sessionData, index) => (
                        <div className="col-md-4 mb-4" key={sessionData.session.session_id} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="session-card">
                                <div className="session-card-header d-flex align-items-center">
                                    <img src={`http://127.0.0.1:8000/storage/${sessionData.doctors[0].image}`} alt={sessionData.doctors[0].first_name} className="session-card-img" />
                                    <div className="session-card-info">
                                        <h5 className="session-card-title">{sessionData.doctors[0].first_name} {sessionData.doctors[0].last_name}</h5>
                                        <p className="session-card-subtitle">{sessionData.doctors[0].medical_profession}</p>
                                        <p className="session-card-experience">Experience: {sessionData.doctors[0].experience_years} years</p>
                                    </div>
                                </div>
                                <div className="session-card-body">
                                    <div className="session-card-meta">
                                        <div><i className="fas fa-calendar-alt"></i> {sessionData.session.session_date}</div>
                                        <div><i className="fas fa-clock"></i> {sessionData.session.session_time}</div>
                                        <div><i className="fas fa-map-marker-alt"></i> {sessionData.doctors[0].clinic_address}</div>
                                    </div>
                                    <div className="session-card-price">
                                        <span>{sessionData.session.session_fees} EGP</span>
                                    </div>
                                </div>
                                <div className="session-card-footer">
                                    <button onClick={() => reserveSession(sessionData.session.session_id)} className="btn btn-primary session-reserve-btn">Reserve Session</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center no-sessions-message">No sessions found</div>
                )}
            </div>
        </div>
    );
}

export default Sessions;
