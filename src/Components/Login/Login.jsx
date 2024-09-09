import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import './Login.css';
import logo from '../../Assets/logo2.png';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .min(7, 'Password is too short')
        .max(18, 'Password is too long')
        .required('Password is required'),
});

function Login() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                let params = new URLSearchParams();
                params.append('email', values.email);
                params.append('password', values.password);

                const response = await axios.post(
                    'http://127.0.0.1:8000/api/login',
                    params,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );

                if (response.data.success) {
                    localStorage.setItem('role', response.data.role);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user_id', response.data.user_id);
                    const subscriptionId = response.data.subscription_id || response.data['subscription_id '];
                    localStorage.setItem('subscription_id', subscriptionId);

                    toast.success('Login successful!');

                    if (response.data.role === 'admin') {
                        window.location.href = '/adminhomepage';
                    } else if (response.data.role === 'parent') {
                        window.location.href = '/homepage';
                    } else if (response.data.role === 'doctor') {
                        window.location.href = '/doctorhomepage';
                    }

                    formik.resetForm();

                } else {
                    throw new Error(response.data.message);
                }
            } catch (error) {
                toast.error('Login failed: ' + error.message);
                console.error('Login failed:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="login-container">
            <Toaster />
            <div className="card-container">
                <div className="left-side">
                    <div className="text-content">
                        <h2>We are One Family</h2>
                        <p>Please login to your account</p>
                        <p>We are dedicated to providing a supportive and nurturing community for families and children facing diverse challenges. At One Family, we believe in the power of empathy, understanding, and genuine support. Join us to access valuable resources, expert advice, and a network of compassionate individuals committed to making a difference. Together, we can create a world where every family feels valued and supported</p>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="right-side">
                    <div className="login-content">
                        <div className="text-center">
                            <img src={logo} alt="Logo" className="logo-login mb-3" />
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-outline mb-4">
                                <div className="input-icon">
                                    <i className="fas fa-envelope"></i>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Enter your Email address"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-danger">{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <div className="form-outline mb-4">
                                <div className="input-icon">
                                    <i className="fas fa-lock"></i>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-danger">{formik.errors.password}</div>
                                ) : null}
                            </div>

                            <div className="text-center pt-1 mb-5 pb-1">
                                <button
                                    className="btn btn-primary-custom btn-block fa-lg mb-3"
                                    type="submit"
                                    disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
                                >
                                    {formik.isSubmitting ? 'Logging in...' : 'Log in'}
                                </button>
                            </div>

                            <div className="d-flex align-items-center justify-content-center pb-4">
                                <p className="mb-0 me-2">Don't have an account?</p>
                                <button type="button" className="btn btn-outline-dark-custom">
                                    <a href="/register">Create new</a>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
