import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from "../../Assets/logo.png"
function Footer() {
    return (
        <footer className="footer-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <img src={logo} alt="Logo" className="img-fluid mb-3 logo-footer" />
                        <p className="small">Empowering Families, Embracing Diversities. At One Family, we are dedicated to providing support, resources, and a nurturing community for parents and children facing diverse challenges. Together, we can create a world where every family feels valued and supported.</p>
                        <div className="social-icons">
                            <Link to="#" className="footer-link me-3"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="#" className="footer-link me-3"><i className="fab fa-twitter"></i></Link>
                            <Link to="#" className="footer-link me-3"><i className="fab fa-instagram"></i></Link>
                            <Link to="#" className="footer-link"><i className="fab fa-youtube"></i></Link>
                        </div>
                    </div>
                    <div className="col-md-2 mb-3 mb-md-0">
                        <h5 className="footer-title">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/about" className="footer-link">About Us</Link></li>
                            <li><Link to="/products" className="footer-link">Products</Link></li>
                            <li><Link to="/events" className="footer-link">Events</Link></li>
                            <li><Link to="/sessions" className="footer-link">Sessions</Link></li>
                            <li><Link to="/blog" className="footer-link">Blog</Link></li>
                            <li><Link to="/disorders" className="footer-link">Disorders</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-2 mb-3 mb-md-0">
                        <h5 className="footer-title">Useful Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="footer-link">Terms and Conditions</Link></li>
                            <li><Link to="/disclaimer" className="footer-link">Disclaimer</Link></li>
                            <li><Link to="/support" className="footer-link">Support</Link></li>
                            <li><Link to="/faq" className="footer-link">FAQ</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5 className="footer-title">Subscribe Our Newsletter</h5>
                        <p className="small">Stay updated with the latest tips, resources, and events from One Family. Subscribe to our newsletter to receive expert advice, inspiring stories, and exclusive offers directly to your inbox.</p>
                        <form>
                            <div className="form-group d-flex">
                                <input type="email" className="form-control" placeholder="Your Email Address" />
                                <button type="submit" className="btn btn-subscribe">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col text-center">
                        <p className="small">&copy; {new Date().getFullYear()}. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
