import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Header.css'; // Import custom CSS for styling
import logo from '../../Assets/logo.png';

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userId = localStorage.getItem('user_id');
            const token = localStorage.getItem('token');
            if (userId && token) {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/user/show', {
                        headers: {
                            'User-Id': userId,
                            'Authorization': token,
                        },
                    });
                    if (response.data.success) {
                        setUser(response.data.user);
                    }
                } catch (error) {
                    console.error('Failed to fetch user details:', error);
                }
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/logout',
                {},
                { headers: { Authorization: token } }
            );
            if (response.data.success) {
                localStorage.clear();
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const userRole = localStorage.getItem('role');
    const subscriptionId = localStorage.getItem('subscription_id');
    const isLoggedIn = userRole !== null;

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" className="img-fluid logo-header" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto custom-nav-items">
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/events">Events</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sessions">Sessions</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Resources
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/bloglist">Blog</Link></li>
                                {isLoggedIn && (userRole === 'parent' && subscriptionId === '2' || userRole === 'admin' || userRole === 'doctor') && (
                                    <>
                                        <li><Link className="dropdown-item" to="/videos">Videos</Link></li>
                                        <li><Link className="dropdown-item" to="/podcasts">Podcasts</Link></li>
                                    </>
                                )}
                                <li><Link className="dropdown-item" to="/disorders">Disorders</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/aboutus">About Us</Link>
                        </li>
                        {isLoggedIn && userRole === 'parent' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <i className="fas fa-shopping-cart"></i>
                                </Link>
                            </li>
                        )}
                        {isLoggedIn && userRole === 'parent' && subscriptionId !== '2' && (
                            <li className="nav-item">
                                <Link className="btn btn-outline-dark" to="/subscription">Subscribe</Link>
                            </li>
                        )}
                        {!isLoggedIn && (
                            <li className="nav-item">
                                <Link className="btn custom-login-btn" to="/login">Login</Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <button className="btn custom-logout-btn" onClick={handleLogout}>Log Out</button>
                                </li>
                                {user && user.image && (
                                    <li className="nav-item">
                                        <Link to="/profile">
                                            <img
                                                src={`http://127.0.0.1:8000/storage/${user.image}`}
                                                alt="Profile"
                                                className="profile-picture"
                                            />
                                        </Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
