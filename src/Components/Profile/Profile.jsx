import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Avatar, Grid, Divider, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminProfile.css'

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user/show', {
                    headers: { 'user_id': localStorage.getItem('user_id') }
                });
                setUserData(response.data.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%">
                <CircularProgress color="primary" size={60} />
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%" className="container-profile">
            <Card sx={{ width: '100%', maxWidth: 800, padding: 4, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <Avatar alt={userData.first_name} src={`http://127.0.0.1:8000/storage/${userData.image}` || '/default-avatar.png'} sx={{ width: 100, height: 100, boxShadow: 2 }} />
                        </Grid>
                        <Grid item xs>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h4" component="div" gutterBottom>
                                    {userData.first_name} {userData.last_name}
                                </Typography>
                            </Box>
                            <Typography variant="body1" color="textSecondary" gutterBottom>
                                {userData.role}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {userData.email}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {userData.phone_number}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {userData.address}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 3 }} />
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">
                                <strong>National ID:</strong> {userData.nat_id}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Date of Birth:</strong> {userData.date_of_birth}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Gender:</strong> {userData.gender}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Marital Status:</strong> {userData.marital_status}
                            </Typography>
                        </Grid>
                    </Grid>
                    {userRole === 'parent' && (
                        <Box mt={3}>
                            <Button variant="contained" color="primary" onClick={() => navigate('/previousorders')}>
                                View Previous Orders
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Profile;
