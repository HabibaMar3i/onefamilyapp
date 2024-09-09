import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, IconButton, Box, Container, Avatar } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EventIcon from '@mui/icons-material/Event';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const cardColors = {
    feedbacks: '#ffcc80',
    vouchers: '#90caf9',
    events: '#a5d6a7',
    products: '#f48fb1',
    users: '#b39ddb',
    orders: '#ffd54f',
};

const icons = {
    feedbacks: <FeedbackIcon fontSize="large" />,
    vouchers: <LocalOfferIcon fontSize="large" />,
    events: <EventIcon fontSize="large" />,
    products: <ShoppingCartIcon fontSize="large" />,
    users: <FamilyRestroomIcon fontSize="large" />,
    orders: <ShoppingCartCheckoutIcon fontSize="large" />,
};

const routes = {
    feedbacks: '/viewfeedback',
    vouchers: '/managevouchers',
    events: '/manageevents',
    products: '/manageproducts',
    users: '/manageusers',
    orders: '/manageorders',
};

const AdminDashboard = () => {
    const [data, setData] = useState({
        feedbacks: null,
        vouchers: null,
        events: null,
        products: null,
        users: null,
        orders: null,
    });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = async (url, key) => {
        const userId = localStorage.getItem('user_id');
        try {
            const response = await axios.get(url, {
                headers: { user_id: userId },
            });
            console.log(`Data fetched for ${key}:`, response.data);
            setData((prevData) => ({
                ...prevData,
                [key]: response.data.count,
            }));
        } catch (err) {
            console.error(`Error fetching data for ${key}:`, err.message);
            setError((prevError) => ({
                ...prevError,
                [key]: err.message,
            }));
        }
    };

    const fetchUserData = async () => {
        const userId = localStorage.getItem('user_id');
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/show', {
                headers: { user_id: userId },
            });
            console.log('User data fetched:', response.data);
            setUser(response.data.user);
        } catch (err) {
            console.error('Failed to fetch user data:', err);
        }
    };

    useEffect(() => {
        const urls = {
            feedbacks: 'http://127.0.0.1:8000/api/feedbacks/',
            vouchers: 'http://127.0.0.1:8000/vouchers/',
            events: 'http://127.0.0.1:8000/events/',
            products: 'http://127.0.0.1:8000/products/',
            users: 'http://127.0.0.1:8000/Admin/Allparents',
            orders: 'http://127.0.0.1:8000/api/all/orders'
        };

        setLoading(true);

        Object.keys(urls).forEach((key) => {
            fetchData(urls[key], key);
        });

        fetchUserData().then(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%">
                <CircularProgress color="primary" size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Grid container spacing={2} justifyContent="center">
                    {Object.keys(error).map((key) => (
                        <Grid item xs={12} sm={6} md={4} key={key}>
                            <Card sx={{ backgroundColor: cardColors[key], borderRadius: 2, boxShadow: 3 }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center">
                                        <IconButton onClick={() => navigate(routes[key])}>
                                            {React.cloneElement(icons[key], { sx: { fontSize: 40, color: 'white' } })}
                                        </IconButton>
                                        <Typography variant="h5" component="div" sx={{ color: 'white', marginLeft: 2 }}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </Typography>
                                    </Box>
                                    <Typography color="error" variant="h6" component="div">
                                        Error: {error[key]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }

    return (
        <Container>
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
                <Box display="flex" alignItems="center">
                    <Avatar
                        alt={`${user?.first_name} ${user?.last_name}`}
                        src={user?.image ? `http://127.0.0.1:8000/storage/${user.image}` : 'default-profile.png'}
                        sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Typography variant="h4" style={{ color: '#26547D' }} fontWeight="bold">
                        Welcome back, <span>{user?.first_name} {user?.last_name}</span>
                    </Typography>
                </Box>
            </Box>
            <Grid container spacing={3} justifyContent="center">
                {Object.keys(data).map((key) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                        <Card sx={{ backgroundColor: cardColors[key], borderRadius: 2, boxShadow: 3 }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <IconButton onClick={() => navigate(routes[key])}>
                                        {React.cloneElement(icons[key], { sx: { fontSize: 40, color: 'white' } })}
                                    </IconButton>
                                    <Typography variant="h5" component="div" sx={{ color: 'white', marginLeft: 2 }}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Typography>
                                </Box>
                                <Typography variant="h4" component="div" align="center" sx={{ color: 'white', marginTop: 2 }}>
                                    {data[key]}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AdminDashboard;
