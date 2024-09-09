import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    Typography,
    Avatar,
    Tooltip,
    ThemeProvider,
    createTheme,
    CssBaseline,
    ListItemText,
    Divider
} from '@mui/material';
import {
    CalendarToday,
    People,
    CardGiftcard,
    Comment,
    ExitToApp,
    ViewList,
    ShoppingCart,
    AccountCircle,
    Home,
    LocalOffer,
    Dashboard,
    Payment
} from '@mui/icons-material';
import './AdminSidebar.css'; // Import custom CSS for additional styling

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Blue color
        },
        secondary: {
            main: '#d32f2f', // Red color for the logout button
        },
        background: {
            default: '#343a40', // Dark background for the sidebar
            paper: '#343a40',
        },
        text: {
            primary: '#ffffff', // White text color
            secondary: '#ffffff', // White text color for secondary items
        },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#26547D', // Dark background for the sidebar
                    overflowX: 'hidden',
                    transition: 'width 0.3s',
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: '#495057',
                        '&:hover': {
                            backgroundColor: '#495057',
                        },
                    },
                    '&:hover': {
                        backgroundColor: '#495057',
                    },
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: 40, // Increased minWidth for better spacing
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    marginLeft: 12, // Margin between icon and text
                },
                primary: {
                    color: '#ffffff', // White text color
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    color: '#ffffff', // White text color for the logout button
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#ffffff', // White text color for the sidebar title
                },
            },
        },
    },
});

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 60;

function AdminSidebar({ isDrawerOpen, toggleDrawer, setShowContentWithSidebar, setShowHeader }) {
    const [user, setUser] = useState({});

    useEffect(() => {
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
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/logout',
                {},
                { headers: { Authorization: `Bearer ${token}` } }
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
    const isLoggedIn = userRole !== null;

    const iconColors = ['#ff5722', '#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#e91e63', '#607d8b', '#3f51b5', '#3f51b5'];
    const lighterColors = ['#82b1ff', '#b39ddb']; // Lighter colors for "Manage Payments" and "View Profile"
    const iconSize = 26; // Set icon size to 24px

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: isDrawerOpen ? drawerWidthExpanded : drawerWidthCollapsed,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isDrawerOpen ? drawerWidthExpanded : drawerWidthCollapsed,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    <ListItem button component={Link} to="/homepage" onClick={() => { setShowContentWithSidebar(false); setShowHeader(true); }}>
                        <ListItemIcon sx={{ color: '#ffffff', minWidth: iconSize }}>
                            <Home sx={{ fontSize: iconSize, marginRight: 1, marginTop: 0.70 }} />
                        </ListItemIcon>
                        {isDrawerOpen && (
                            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                                One Family
                            </Typography>
                        )}
                    </ListItem>
                    <Divider sx={{ borderColor: '#FCFCFC', marginTop: 0.70 }} />
                    <Box sx={{ textAlign: 'center', padding: '1rem' }}>
                        {isDrawerOpen && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                                <Avatar
                                    alt={`${user.first_name} ${user.last_name}`}
                                    src={user.image ? `http://127.0.0.1:8000/storage/${user.image}` : 'default-profile.png'}
                                    sx={{ width: 80, height: 80, mb: 2 }}
                                />
                                <Typography variant="h6" sx={{ color: '#ffffff' }}>
                                    {user.first_name} {user.last_name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#ffffff' }}>
                                    {user.email}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    {isLoggedIn && userRole === 'admin' && (
                        <>
                            <Tooltip title="Dashboard" placement="right">
                                <ListItem button component={Link} to="/adminhomepage" onClick={() => { setShowContentWithSidebar(true); setShowHeader(false); }}>
                                    <ListItemIcon sx={{ color: iconColors[0], minWidth: iconSize }}>
                                        <Dashboard sx={{ fontSize: iconSize }} />
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary="Dashboard" />}
                                </ListItem>
                            </Tooltip>
                            <Tooltip title="Manage Events" placement="right">
                                <ListItem button component={Link} to="/manageevents" onClick={() => { setShowContentWithSidebar(true); setShowHeader(false); }}>
                                    <ListItemIcon sx={{ color: iconColors[1], minWidth: iconSize }}>
                                        <CalendarToday sx={{ fontSize: iconSize }} />
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary="Manage Events" />}
                                </ListItem>
                            </Tooltip>
                            <Tooltip title="Manage Users" placement="right">
                                <ListItem button component={Link} to="/manageusers" onClick={() => { setShowContentWithSidebar(true); setShowHeader(false); }}>
                                    <ListItemIcon sx={{ color: iconColors[2], minWidth: iconSize }}>
                                        <People sx={{ fontSize: iconSize }} />
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary="Manage Users" />}
                                </ListItem>
                            </Tooltip>
                            <Tooltip title="Manage Products" placement="right">
                                <ListItem button component={Link} to="/manageproducts" onClick={() => { setShowContentWithSidebar(true); setShowHeader(false); }}>
                                    <ListItemIcon sx={{ color: iconColors[3], minWidth: iconSize }}>
                                        <ShoppingCart sx={{ fontSize: iconSize }} />
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary="Manage Products" />}
                                </ListItem>
                            </Tooltip>
                            <Tooltip title="Manage Vouchers" placement="right">
                                <ListItem button component={Link} to="/managevouchers" onClick={() => { setShowContentWithSidebar(true); setShowHeader(false); }}>
                                    <ListItemIcon sx={{ color: iconColors[4], minWidth: iconSize }}>
                                        <LocalOffer sx={{ fontSize: iconSize }} />
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary="Manage Vouchers" />}
                                </ListItem>
                            </Tooltip>
                            <Tooltip title="View Feedback" placement="right">
                                <ListItem button component={Link} to="/viewfeedback" onClick={() => { setShowContentWithSidebar(true); setShowHeader(false); }}>
                                    <ListItemIcon sx={{ color: iconColors[5], minWidth: iconSize }}>
                                        <Comment sx={{ fontSize: iconSize }} />
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary="View Feedback" />}
                                </ListItem>
                            </Tooltip>
                            <Tooltip title="Manage Orders" placement="right">
                                <ListItem button component={Link} to="/manageorders" onClick={() => { setShowContentWithSidebar(true); setShowHeader(false); }}>
                                    <ListItemIcon sx={{ color: iconColors[6], minWidth: iconSize }}>
                                        <ViewList sx={{ fontSize: iconSize }} />
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary="Manage Orders" />}
                                </ListItem>
                            </Tooltip>
                            <Tooltip title="Manage Payments" placement="right">
                                <ListItem button component={Link} to="/managepayments" onClick={() => { setShowContentWithSidebar(true); setShowHeader(false); }}>
                                    <ListItemIcon sx={{ color: lighterColors[0], minWidth: iconSize }}>
                                        <Payment sx={{ fontSize: iconSize }} />
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary="Manage Payments" />}
                                </ListItem>
                            </Tooltip>
                            <Tooltip title="View Profile" placement="right">
                                <ListItem button component={Link} to="/profile" onClick={() => { setShowContentWithSidebar(true); setShowHeader(false); }}>
                                    <ListItemIcon sx={{ color: lighterColors[1], minWidth: iconSize }}>
                                        <AccountCircle sx={{ fontSize: iconSize }} />
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary="View Profile" />}
                                </ListItem>
                            </Tooltip>
                            <Tooltip title="Log Out" placement="right">
                                <ListItem button onClick={handleLogout} sx={{ color: theme.palette.secondary.main }}>
                                    <ListItemIcon sx={{ color: theme.palette.secondary.main, minWidth: iconSize }}>
                                        <ExitToApp sx={{ fontSize: iconSize }} />
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary="Log Out" />}
                                </ListItem>
                            </Tooltip>
                        </>
                    )}
                </List>
            </Drawer>
        </ThemeProvider>
    );
}

export default AdminSidebar;
