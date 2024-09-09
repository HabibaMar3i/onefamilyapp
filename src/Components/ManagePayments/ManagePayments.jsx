import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Box,
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    MenuItem,
    ThemeProvider,
    createTheme,
    CircularProgress
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
    modalContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        maxHeight: '100vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 5
    },
    dialogActions: { display: 'flex', justifyContent: 'center', marginTop: '1rem' },
};

function ManagePayments() {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isStatusModalOpen, setStatusModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = () => {
        setLoading(true);
        axios.get('http://127.0.0.1:8000/api/doctors/requests', {
            headers: { 'user_id': user_id }
        })
        .then(response => {
            if (response.data.success) {
                setRequests(response.data.All_doctors_requests || []);
            }
        })
        .catch(error => {
            toast.error('Failed to load requests');
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const handleChangeStatus = (request) => {
        setSelectedRequest(request);
        setStatusModalOpen(true);
    };

    async function updateStatus(values, { setSubmitting }) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/doctor/request/update', 
                {
                    session_id: selectedRequest.session_id,
                    doctor_request_status: values.doctor_request_status
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'user_id': user_id
                    }
                }
            );
            if (response.data.success) {
                toast.success('Request status updated successfully', {
                    duration: 2000,
                    position: 'top-center'
                });
                fetchRequests(); // Refresh the requests list
                setStatusModalOpen(false);
            } else {
                toast.error(response.data.message || 'Failed to update status', {
                    duration: 2000,
                    position: 'top-center'
                });
            }
        } catch (error) {
            toast.error('Oops, Something went wrong..', {
                duration: 2000,
                position: 'top-center'
            });
        } finally {
            setSubmitting(false);
        }
    }

    const statusFormik = useFormik({
        initialValues: {
            doctor_request_status: ''
        },
        validationSchema: Yup.object({
            doctor_request_status: Yup.string().required("Request status is required")
        }),
        onSubmit: updateStatus
    });

    useEffect(() => {
        if (selectedRequest) {
            statusFormik.setFieldValue('doctor_request_status', selectedRequest.doctor_request_status);
        }
    }, [selectedRequest]);

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
                    <Typography variant="h4" component="h2" sx={styles.headerText}>Manage Payments</Typography>
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
                                <TableCell>Actions</TableCell>
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
                                        <TableCell>
                                            <Button onClick={() => handleChangeStatus(request)} variant="outlined" color="primary" size="small">
                                                Change Status
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="7" align="center">No requests found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {isStatusModalOpen && (
                    <Dialog open={isStatusModalOpen} onClose={() => setStatusModalOpen(false)}>
                        <DialogTitle>Update Request Status</DialogTitle>
                        <DialogContent>
                            <form onSubmit={statusFormik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            select
                                            id="doctor_request_status"
                                            name="doctor_request_status"
                                            label="Request Status"
                                            onChange={statusFormik.handleChange}
                                            onBlur={statusFormik.handleBlur}
                                            value={statusFormik.values.doctor_request_status}
                                            error={statusFormik.touched.doctor_request_status && Boolean(statusFormik.errors.doctor_request_status)}
                                            helperText={statusFormik.touched.doctor_request_status && statusFormik.errors.doctor_request_status}
                                            size="small"
                                        >
                                            <MenuItem value="sent">Sent</MenuItem>
                                            <MenuItem value="accepted">Accepted</MenuItem>
                                            <MenuItem value="rejected">Rejected</MenuItem>
                                            <MenuItem value="cancelled">Cancelled</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <DialogActions sx={styles.dialogActions}>
                                    <Button onClick={() => setStatusModalOpen(false)} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary" disabled={statusFormik.isSubmitting}>
                                        Update Status
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default ManagePayments;
