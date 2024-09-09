import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Box,
    CircularProgress,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    ThemeProvider,
    createTheme
} from '@mui/material';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                    },
                },
            },
        },
    },
});

const styles = {
    container: { marginTop: '2rem' },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        backgroundColor: '#f0f4f8',
        padding: '1rem',
        borderRadius: '10px'
    },
    headerText: { fontWeight: 'bold', color: '#174A90' },
    table: { minWidth: 650 },
    tableHead: { backgroundColor: '#b0e0e6' },
};

function DoctorRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/doctor/requests', {
                headers: { 'user_id': user_id }
            });
            if (response.data.success) {
                setRequests(response.data.doctor_requests || []);
            }
        } catch (error) {
            toast.error('Failed to load requests');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%">
                <CircularProgress color="primary" size={60} />
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container sx={styles.container}>
                <Box sx={styles.header}>
                    <Typography variant="h4" component="h2" sx={styles.headerText}>Doctor Requests</Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={styles.table}>
                        <TableHead sx={styles.tableHead}>
                            <TableRow>
                                <TableCell>Session ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Card Number</TableCell>
                                <TableCell>Bank Account Number</TableCell>
                                <TableCell>Request Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.length > 0 ? (
                                requests.map((request, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{request.session_id}</TableCell>
                                        <TableCell>{request.first_name}</TableCell>
                                        <TableCell>{request.last_name}</TableCell>
                                        <TableCell>{request.card_number}</TableCell>
                                        <TableCell>{request.bank_account_number}</TableCell>
                                        <TableCell>{request.doctor_request_status}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="6" align="center">No requests found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
}

export default DoctorRequests;
