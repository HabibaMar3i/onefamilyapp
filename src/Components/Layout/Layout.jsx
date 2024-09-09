import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import DoctorSidebar from '../DoctorSidebar/DoctorSidebar';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import axios from 'axios';
import './Layout.css'; // Custom CSS for layout

function Layout() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [user, setUser] = useState({});
    const [showContentWithSidebar, setShowContentWithSidebar] = useState(true);
    const [showHeader, setShowHeader] = useState(false);
    const userRole = localStorage.getItem('role');
    const subscriptionId = localStorage.getItem('subscription_id');
    const isLoggedIn = userRole !== null;
    const location = useLocation();

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        if (isLoggedIn) {
            const fetchUserData = async () => {
                const userId = localStorage.getItem('user_id');
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/user/show', {
                        headers: {
                            user_id: userId,
                        },
                    });
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            };

            fetchUserData();
        }
    }, [isLoggedIn]);

    const isParentPage = location.pathname === '/homepage' ||
                         location.pathname === '/products' ||
                         location.pathname === '/events' ||
                         location.pathname === '/sessions' ||
                         location.pathname === '/bloglist' ||
                         location.pathname === '/disorders' ||
                         location.pathname === '/aboutus' ||
                         (location.pathname === '/videos' && subscriptionId === '2') ||
                         (location.pathname === '/podcasts' && subscriptionId === '2');

    const layoutClassName = isLoggedIn && (userRole === 'admin' || userRole === 'doctor') ? (isParentPage || showHeader ? 'layout-container layout-container-default' : 'layout-container layout-container-admin') : 'layout-container layout-container-default';

    return (
        <div className={layoutClassName}>
            {isLoggedIn && userRole === 'admin' ? (
                <React.Fragment>
                    <AdminSidebar isDrawerOpen={isDrawerOpen} user={user} setShowContentWithSidebar={setShowContentWithSidebar} setShowHeader={setShowHeader} />
                    <div className="main-content">
                        {showHeader || isParentPage ? (
                            <Header />
                        ) : (
                            <AdminNavbar toggleDrawer={toggleDrawer} user={user} isDrawerOpen={isDrawerOpen} />
                        )}
                        {showContentWithSidebar ? (
                            <div className="content-with-sidebar">
                                <Outlet />
                            </div>
                        ) : (
                            <div className="content">
                                <Outlet />
                            </div>
                        )}
                    </div>
                </React.Fragment>
            ) : isLoggedIn && userRole === 'doctor' ? (
                <React.Fragment>
                    {isParentPage ? (
                        <React.Fragment>
                            <Header />
                            <div className="content">
                                <Outlet />
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <DoctorSidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} user={user} />
                            <div className="main-content">
                                <AdminNavbar toggleDrawer={toggleDrawer} user={user} isDrawerOpen={isDrawerOpen} />
                                <div className="content-with-sidebar">
                                    <Outlet />
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Header />
                    <div className="content">
                        <Outlet />
                    </div>
                    <Footer />
                </React.Fragment>
            )}
        </div>
    );
}
export default Layout;
