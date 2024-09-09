import React from 'react';
import error from '../../Assets/error (6).png';
import './NotFound.css'; // Make sure to create and import the CSS file

function NotFound() {
    return (
        <section className="not-found-section d-flex align-items-center min-vh-100 py-5">
            <div className="not-found-container container py-5">
                <div className="row align-items-center">
                    <div className="col-md-6 order-md-2">
                        <img src={error} alt="Page Not Found" className="not-found-image img-fluid"/>
                    </div>
                    <div className="col-md-6 text-center text-md-start">
                        <div className="not-found-text-block mb-3">
                            <h1 className="not-found-title fw-bold display-4">PAGE NOT FOUND!</h1>
                        </div>
                        <div className="not-found-text-block mb-3">
                            <h1 className="not-found-error display-1 fw-bold text-muted">Error 404</h1>
                        </div>
                        <div className="not-found-text-block mb-5">
                            <p className="not-found-description fs-5 fw-light">
                                The page you are looking for was moved, removed, or might never have existed.
                            </p>
                        </div>
                        <div className="not-found-text-block">
                            <button className="not-found-button btn btn-lg" onClick={() => window.location.href = '/'}>
                                Back to Homepage
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
