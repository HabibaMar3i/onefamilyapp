import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, IconButton, Box, Container, Avatar } from '@mui/material';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const cardColors = {
    doctorRequests: '#b39ddb',
    doctorSessions: '#81d4fa',
};

const icons = {
    doctorRequests: <FamilyRestroomIcon fontSize="large" />,
    doctorSessions: <EventAvailableIcon fontSize="large" />,
};

const DoctorHomePage = () => {
    const [requestsCount, setRequestsCount] = useState(0);
    const [sessionsCount, setSessionsCount] = useState(0);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchDoctorRequests = async () => {
        const userId = localStorage.getItem('user_id');
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/doctor/requests', {
                headers: { user_id: userId },
            });
            setRequestsCount(response.data.count);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchDoctorSessions = async () => {
        const userId = localStorage.getItem('user_id');
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/doctor/sessions', {}, {
                headers: { user_id: userId },
            });
            setSessionsCount(response.data.count);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchUserData = async () => {
        const userId = localStorage.getItem('user_id');
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/show', {
                headers: { user_id: userId },
            });
            setUser(response.data.user);
        } catch (err) {
            console.error('Failed to fetch user data:', err);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchDoctorRequests();
        fetchDoctorSessions();
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
                <Typography color="error" variant="h6" component="div" align="center">
                    Error: {error}
                </Typography>
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
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: cardColors['doctorRequests'], borderRadius: 2, boxShadow: 3 }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <IconButton>
                                    {React.cloneElement(icons['doctorRequests'], { sx: { fontSize: 40, color: 'white' } })}
                                </IconButton>
                                <Typography variant="h5" component="div" sx={{ color: 'white', marginLeft: 2 }}>
                                    Doctor Requests
                                </Typography>
                            </Box>
                            <Typography variant="h4" component="div" align="center" sx={{ color: 'white', marginTop: 2 }}>
                                {requestsCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: cardColors['doctorSessions'], borderRadius: 2, boxShadow: 3 }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <IconButton>
                                    {React.cloneElement(icons['doctorSessions'], { sx: { fontSize: 40, color: 'white' } })}
                                </IconButton>
                                <Typography variant="h5" component="div" sx={{ color: 'white', marginLeft: 2 }}>
                                    Doctor Sessions
                                </Typography>
                            </Box>
                            <Typography variant="h4" component="div" align="center" sx={{ color: 'white', marginTop: 2 }}>
                                {sessionsCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DoctorHomePage;
