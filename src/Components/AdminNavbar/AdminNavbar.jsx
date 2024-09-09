import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function AdminNavbar({ toggleDrawer, user, isDrawerOpen }) {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#26547D' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer}
                    sx={{ position: 'absolute', left: isDrawerOpen ? '260px' : '80px' }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                        Welcome back, {user.first_name}!
                    </Typography>
                    <IconButton onClick={handleProfileClick}>
                        <Avatar
                            alt={`${user.first_name} ${user.last_name}`}
                            src={user.image ? `http://127.0.0.1:8000/storage/${user.image}` : 'default-profile.png'}
                        />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default AdminNavbar;
