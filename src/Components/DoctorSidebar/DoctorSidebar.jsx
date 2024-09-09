import React, { useState, useEffect } from 'react';
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
    Divider,
    Button
} from '@mui/material';
import {
    ExitToApp,
    AddCircle,
    EventNote,
    Payment,
    Home,
    Dashboard
} from '@mui/icons-material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#d32f2f',
        },
        background: {
            default: '#343a40',
            paper: '#343a40',
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffffff',
        },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#26547D',
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
                    minWidth: 40,
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    marginLeft: 12,
                },
                primary: {
                    color: '#ffffff',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    color: '#ffffff',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                },
            },
        },
    },
});

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 60;

function DoctorSidebar({ isDrawerOpen, toggleDrawer, user }) {
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

    const iconColors = ['#ff5722', '#4caf50', '#2196f3', '#ff9800'];
    const iconSize = 26;

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
                    <ListItem button component={Link} to="/homepage">
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
                    <Tooltip title="Dashboard" placement="right">
                                <ListItem button component={Link} to="/doctorhomepage">
                                    <ListItemIcon sx={{ color: iconColors[4], minWidth: iconSize }}>
                                        <Dashboard sx={{ fontSize: iconSize }} />
                                    </ListItemIcon>
                                    {isDrawerOpen && <ListItemText primary="Dashboard" />}
                                </ListItem>
                            </Tooltip>
                    <Tooltip title="Manage Sessions" placement="right">
                        <ListItem button component={Link} to="/managesessions">
                            <ListItemIcon sx={{ color: iconColors[0], minWidth: iconSize }}>
                                <AddCircle sx={{ fontSize: iconSize }} />
                            </ListItemIcon>
                            {isDrawerOpen && <ListItemText primary="Manage Sessions" />}
                        </ListItem>
                    </Tooltip>
                    <Tooltip title="Reserved Sessions" placement="right">
                        <ListItem button component={Link} to="/reservedsessions">
                            <ListItemIcon sx={{ color: iconColors[1], minWidth: iconSize }}>
                                <EventNote sx={{ fontSize: iconSize }} />
                            </ListItemIcon>
                            {isDrawerOpen && <ListItemText primary="Reserved Sessions" />}
                        </ListItem>
                    </Tooltip>
                    <Tooltip title="Payment Requests" placement="right">
                        <ListItem button component={Link} to="/doctorrequests">
                            <ListItemIcon sx={{ color: iconColors[2], minWidth: iconSize }}>
                                <Payment sx={{ fontSize: iconSize }} />
                            </ListItemIcon>
                            {isDrawerOpen && <ListItemText primary="Payment Requests" />}
                        </ListItem>
                    </Tooltip>
                    <Tooltip title="Log Out" placement="right">
                        <ListItem button onClick={handleLogout}>
                            <ListItemIcon sx={{ color: 'red', minWidth: iconSize }}>
                                <ExitToApp sx={{ fontSize: iconSize }} />
                            </ListItemIcon>
                            {isDrawerOpen && <ListItemText primary="Log Out" />}
                        </ListItem>
                    </Tooltip>
                </List>
            </Drawer>
        </ThemeProvider>
    );
}

export default DoctorSidebar;
