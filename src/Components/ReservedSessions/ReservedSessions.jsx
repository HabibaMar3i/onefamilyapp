import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import {
    Box,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    List,
    ListItem,
    ListItemText,
    ThemeProvider,
    createTheme
} from '@mui/material';

const theme = createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: '#b0e0e6', // baby blue color
                    fontWeight: 'bold',
                },
                body: {
                    fontSize: 14,
                },
            },
        },
    },
});

function ReservedSessions() {
    const { data, isLoading, isError } = useQuery('reservedSessions', fetchReservedSessions);

    async function fetchReservedSessions() {
        try {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                throw new Error('User-Id is missing from local storage');
            }

            const response = await axios.post('http://127.0.0.1:8000/api/reservedSessions', null, {
                headers: {
                    'user_id': userId
                }
            });

            return response.data['Patient list'];
        } catch (error) {
            throw new Error('Failed to fetch reserved sessions');
        }
    }

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%">
                <CircularProgress color="primary" size={60} />
            </Box>
        );
    }

    if (isError) {
        toast.error('Failed to fetch reserved sessions');
        return <Typography color="error" align="center">An error has occurred</Typography>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ marginTop: '2rem' }}>
                <Box sx={{ backgroundColor: '#f0f4f8', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#174A90', marginBottom: '1rem' }}>
                        Reserved Sessions
                    </Typography>
                </Box>
                <Box sx={{ backgroundColor: '#f0f4f8', padding: '1rem', borderRadius: '10px' }}>
                    {data.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Marital Status</TableCell>
                                        <TableCell>Date of Birth</TableCell>
                                        <TableCell>Session Type</TableCell>
                                        <TableCell>Session Time</TableCell>
                                        <TableCell>Session Date</TableCell>
                                        <TableCell>Children</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((session, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{session.first_name}</TableCell>
                                            <TableCell>{session.last_name}</TableCell>
                                            <TableCell>{session.marital_status}</TableCell>
                                            <TableCell>{session.date_of_birth}</TableCell>
                                            <TableCell>{session.session_type}</TableCell>
                                            <TableCell>{session.session_time}</TableCell>
                                            <TableCell>{session.session_date}</TableCell>
                                            <TableCell>
                                                {session.children && session.children.length > 0 ? (
                                                    <List>
                                                        {session.children.map((child, idx) => (
                                                            <ListItem key={idx} sx={{ padding: 0 }}>
                                                                <ListItemText 
                                                                    primary={`${child.name}, ${child.age} years, ${child.gender}`}
                                                                    primaryTypographyProps={{ variant: 'body2' }}
                                                                />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                ) : (
                                                    <Typography variant="body2">No children</Typography>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography align="center">No reserved sessions found</Typography>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default ReservedSessions;
