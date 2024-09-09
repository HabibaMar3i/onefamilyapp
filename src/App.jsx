import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Layout from './Components/Layout/Layout';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Subscription from './Components/Subscription/Subscription';
import DoctorHomePage from './Components/DoctorHomePage/DoctorHomePage';
import AdminHomePage from './Components/AdminHomePage/AdminHomePage';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import NotFound from './Components/NotFound/NotFound';
import Products from './Components/Products/Products';
import Events from './Components/Events/Events';
import ManageSessions from './Components/ManageSessions/ManageSessions';
import { Toaster } from 'react-hot-toast';
import Sessions from './Components/Sessions/Sessions';
import ManageUsers from './Components/ManageUsers/ManageUsers';
import ManageProducts from './Components/ManageProducts/ManageProducts';
import ManageEvents from './Components/ManageEvents/ManageEvents';
import ManageVouchers from './Components/ManageVouchers/ManageVouchers';
import ReservedSessions from './Components/ReservedSessions/ReservedSessions';
import Cart from './Components/Cart/Cart';
import ViewFeedback from './Components/ViewFeedback/ViewFeedback';
import Podcasts from './Components/Podcasts/Podcasts';
import PodcastDetail from './Components/PodcastDetail/PodcastDetail'; 
import BlogList from './Components/BlogList/BlogList';
import SingleBlog from './Components/SingleBlog/SingleBlog';
import Videos from './Components/Videos/Videos';
import Disorders from './Components/Disorders/Disorders';
import DisorderDetail from './Components/DisorderDetail/DisorderDetail';
import LatestOrder from './Components/LatestOrder/LatestOrder';
import PreviousOrders from './Components/PreviousOrders/PreviousOrders';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import AboutUs from './Components/AboutUs/AboutUs';
import ManageOrders from './Components/ManageOrders/ManageOrders';
import Profile from './Components/Profile/Profile';
import AdminNavbar from './Components/AdminNavbar/AdminNavbar';
import ManagePayments from './Components/ManagePayments/ManagePayments';
import DoctorRequests from './Components/DoctorRequests/DoctorRequests';
import SubscriptionSuccess from './Components/SubscriptionSuccess/SubscriptionSuccess';

export default function App() {
    const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'parent');
    const subscriptionId = localStorage.getItem('subscription_id');
    const isLoggedIn = !!userRole;

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { index: true, element: <HomePage /> },
                { path: 'homepage', element: <HomePage /> },
                { path: 'app2', element: <HomePage /> },
                { path: 'register', element: <Register /> },
                { path: 'products', element: <Products /> },
                { path: 'sessions', element: <Sessions /> },
                { path: 'events', element: <Events /> },
                { path: 'login', element: <Login /> },
                { path: 'aboutus', element: <AboutUs /> },
                { path:"/products/:productId", element: <ProductDetails /> },
                { path: 'disorders', element: <Disorders /> },
                { path: 'disorders/:id', element: <DisorderDetail /> },
                { 
                    path: 'podcasts', 
                    element: (userRole === 'parent' && subscriptionId === '2') || userRole === 'admin' || userRole === 'doctor' ? <ProtectedRoute><Podcasts /></ProtectedRoute> : <Navigate to="/homepage" /> 
                },
                { 
                    path: 'videos', 
                    element: (userRole === 'parent' && subscriptionId === '2') || userRole === 'admin' || userRole === 'doctor' ? <ProtectedRoute><Videos /></ProtectedRoute> : <Navigate to="/homepage" /> 
                },
                { path: 'podcast/:id', element: <PodcastDetail /> },
                { path: 'bloglist', element: <BlogList />},
                { path: 'bloglist/:id', element: <SingleBlog /> },
            
                { 
                    path: 'subscription', 
                    element: userRole === 'parent' ? <ProtectedRoute><Subscription /></ProtectedRoute> : <Navigate to="/homepage" /> 
                },
                { 
                    path: 'cart', 
                    element: userRole === 'parent' ? <ProtectedRoute><Cart /></ProtectedRoute> : <Navigate to="/homepage" /> 
                },
                { 
                    path: 'latestorder', 
                    element: userRole === 'parent'? <ProtectedRoute><LatestOrder /></ProtectedRoute> : <Navigate to="/homepage" /> 
                },
                { 
                    path: 'subscriptionsuccess', 
                    element: userRole === 'parent'? <ProtectedRoute><SubscriptionSuccess /></ProtectedRoute> : <Navigate to="/homepage" /> 
                },
                { 
                    path: 'previousorders', 
                    element: userRole === 'parent'? <ProtectedRoute><PreviousOrders /></ProtectedRoute> : <Navigate to="/homepage" /> 
                },
                { 
                    path: 'doctorhomepage', 
                    element: userRole === 'doctor' ? <DoctorHomePage /> : <Navigate to="/notfound" /> 
                },
                { 
                    path: 'managesessions', 
                    element: userRole === 'doctor' ? <ManageSessions /> : <Navigate to="/notfound" /> 
                },
                { 
                    path: 'reservedsessions', 
                    element: userRole === 'doctor' ? <ReservedSessions /> : <Navigate to="/notfound" /> 
                },
                { 
                    path: 'doctorrequests', 
                    element: userRole === 'doctor' ? <DoctorRequests /> : <Navigate to="/notfound" /> 
                },
                { 
                    path: 'adminhomepage', 
                    element: userRole === 'admin' ? <AdminHomePage /> : <Navigate to="/notfound" /> 
                },
                { 
                    path: 'manageusers', 
                    element: userRole === 'admin' ? <ManageUsers /> : <Navigate to="/notfound" /> 
                },
                { 
                    path: 'manageevents', 
                    element: userRole === 'admin' ? <ManageEvents /> : <Navigate to="/notfound" /> 
                },
                { 
                    path: 'managevouchers', 
                    element: userRole === 'admin' ? <ManageVouchers /> : <Navigate to="/notfound" /> 
                },
                { 
                    path: 'manageproducts', 
                    element: userRole === 'admin' ? <ManageProducts /> : <Navigate to="/notfound" /> 
                },
                { 
                    path: 'manageorders', 
                    element: userRole === 'admin' ? <ManageOrders /> : <Navigate to="/notfound" /> 
                },
                { 
                    path: 'managepayments', 
                    element: userRole === 'admin' ? <ManagePayments /> : <Navigate to="/notfound" /> 
                },
                { 
                    path: 'profile', 
                    element: isLoggedIn ? <ProtectedRoute><Profile /></ProtectedRoute> : <Navigate to="/login" /> 
                },
                { 
                    path: 'adminnavbar', 
                    element: userRole === 'admin' ? <AdminNavbar/> : <Navigate to="/notfound" /> 
                },
                { 
                    path: 'viewfeedback', 
                    element: userRole === 'admin' ? <ViewFeedback /> : <Navigate to="/notfound" /> 
                },
                { path: '*', element: <NotFound /> },
            ],
        },
    ]);

    return (
        <>
            <RouterProvider router={routes} />
            <Toaster />
        </>
    );
}
