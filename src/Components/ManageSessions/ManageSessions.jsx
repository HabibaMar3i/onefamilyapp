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
    TextField,
    DialogTitle,
    Grid,
    CircularProgress,
    ThemeProvider,
    createTheme
} from '@mui/material';
import './ManageSessions.css';

const appointmentValidationSchema = Yup.object({
    appointment_date: Yup.date().required("Appointment date is required")
});

const sessionValidationSchema = Yup.object({
    session_date: Yup.date().required("Session date is required"),
    session_fees: Yup.number().required("Session fees are required"),
    session_type: Yup.string().required("Session type is required"),
    session_time: Yup.string().required("Session time is required"),
    session_status: Yup.string().required("Session status is required")
});

const paymentValidationSchema = Yup.object({
    card_number: Yup.string().required("Card number is required"),
    bank_account_number: Yup.string().required("Bank account number is required")
});

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

function ManageSessions() {
    const [msg, setMsg] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [doctorSessions, setDoctorSessions] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [loadingSessions, setLoadingSessions] = useState(true);

    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        fetchAppointments();
        fetchSessions();
        fetchDoctorSessions();
    }, [user_id]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/appointments/', {
                headers: { 'user_id': user_id }
            });
            if (response.data.success) {
                setAppointments(response.data.appointments || []);
            } else {
            }
        } catch (error) {
        } finally {
            setLoadingAppointments(false);
        }
    };

    const fetchSessions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/sessions', {
                headers: { 'user_id': user_id }
            });
            if (response.data.success) {
                const userSessions = response.data.sessions.filter(session => session.user_id === user_id);
                setSessions(userSessions);
            } else {
            }
        } catch (error) {
        } finally {
            setLoadingSessions(false);
        }
    };

    const fetchDoctorSessions = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/doctor/sessions', {}, {
                headers: { 'user_id': user_id }
            });
            if (response.data.success) {
                setDoctorSessions(response.data['Doctor Sessions list'] || []);
            } else {
            }
        } catch (error) {
        }
    };

    async function deleteAppointment(appointment_id) {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/appointments/deleteAppointment`, {
                params: { appointment_id },
                headers: { 'user_id': user_id }
            });
            if (response.data.success) {
                setAppointments(appointments.filter(appointment => appointment.appointment_id !== appointment_id));
                toast.success('Appointment deleted successfully', {
                    duration: 2000,
                    position: 'top-center'
                });
            } else {
                toast.error(response.data.message || 'Failed to delete appointment', {
                    duration: 2000,
                    position: 'top-center'
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete appointment', {
                duration: 2000,
                position: 'top-center'
            });
        }
    }

    async function addAppointment(values, { setSubmitting }) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/appointments/store', 
                { ...values, user_id }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'user_id': user_id
                    }
                }
            );
            if (response.data.success) {
                setAppointments([...appointments, response.data.appointment_data]);
                toast.success('Appointment added successfully', {
                    duration: 2000,
                    position: 'top-center'
                });
                appointmentFormik.resetForm();
            } else {
                toast.error(response.data.message || 'Failed to add appointment', {
                    duration: 2000,
                    position: 'top-center'
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add appointment', {
                duration: 2000,
                position: 'top-center'
            });
        } finally {
            setSubmitting(false);
        }
    }

    async function addSession(values, { setSubmitting }) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/sessions/store', 
                {
                    ...values,
                    appointment_id: selectedAppointment.appointment_id,
                    user_id: user_id
                }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'user_id': user_id
                    }
                }
            );
            if (response.data.success) {
                toast.success('Session added successfully', {
                    duration: 2000,
                    position: 'top-center'
                });
                sessionFormik.resetForm();
                setSelectedAppointment(null); 
                fetchSessions(); // Fetch sessions after adding a new session
            } else {
                toast.error(response.data.message || 'Failed to add session', {
                    duration: 2000,
                    position: 'top-center'
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add session', {
                duration: 2000,
                position: 'top-center'
            });
        } finally {
            setSubmitting(false);
        }
    }

    async function requestPayment(values, { setSubmitting }) {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/doctor/sessions/request`, 
                { ...values, session_id: selectedSession.session_id }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'user_id': user_id
                    }
                }
            );
            if (response.data.success) {
                toast.success('Payment requested successfully', {
                    duration: 2000,
                    position: 'top-center'
                });
                paymentFormik.resetForm();
                setPaymentModalOpen(false);
            } else {
                toast.error(response.data.message || 'Failed to request payment', {
                    duration: 2000,
                    position: 'top-center'
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to request payment', {
                duration: 2000,
                position: 'top-center'
            });
        } finally {
            setSubmitting(false);
        }
    }

    const appointmentFormik = useFormik({
        initialValues: {
            appointment_date: ''
        },
        validationSchema: appointmentValidationSchema,
        onSubmit: addAppointment
    });

    const sessionFormik = useFormik({
        initialValues: {
            session_date: '',
            session_fees: '',
            session_type: '',
            session_time: '',
            session_status: ''
        },
        validationSchema: sessionValidationSchema,
        onSubmit: addSession
    });

    const paymentFormik = useFormik({
        initialValues: {
            card_number: '',
            bank_account_number: ''
        },
        validationSchema: paymentValidationSchema,
        onSubmit: requestPayment
    });

    useEffect(() => {
        if (selectedAppointment) {
            sessionFormik.setFieldValue('session_date', selectedAppointment.appointment_date);
        }
    }, [selectedAppointment]);

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ marginTop: '2rem' }}>
                <Box sx={{ backgroundColor: '#f0f4f8', padding: '1rem', borderRadius: '10px' }}>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#174A90', marginBottom: '1rem' }}>
                        Manage Sessions
                    </Typography>
                    <form onSubmit={appointmentFormik.handleSubmit} style={{ marginBottom: '1rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <TextField
                                fullWidth
                                id="appointment_date"
                                name="appointment_date"
                                label="Appointment Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                onChange={appointmentFormik.handleChange}
                                onBlur={appointmentFormik.handleBlur}
                                value={appointmentFormik.values.appointment_date}
                                error={appointmentFormik.touched.appointment_date && Boolean(appointmentFormik.errors.appointment_date)}
                                helperText={appointmentFormik.touched.appointment_date && appointmentFormik.errors.appointment_date}
                                size="small"
                                sx={{ marginRight: '1rem' }}
                            />
                            <Button type="submit" variant="contained" color="primary" disabled={appointmentFormik.isSubmitting}>
                                Add Appointment
                            </Button>
                        </Box>
                    </form>
                    {loadingAppointments ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#b0e0e6' }}>
                                    <TableRow>
                                        <TableCell>Appointment ID</TableCell>
                                        <TableCell>Appointment Date</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {appointments.length > 0 ? (
                                        appointments.map(appointment => (
                                            <TableRow key={appointment.appointment_id}>
                                                <TableCell>{appointment.appointment_id}</TableCell>
                                                <TableCell>{appointment.appointment_date}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => setSelectedAppointment(appointment)} variant="outlined" color="primary" size="small">
                                                        Add Session
                                                    </Button>
                                                    <Button onClick={() => deleteAppointment(appointment.appointment_id)} variant="outlined" color="error" size="small" sx={{ marginLeft: '0.5rem' }}>
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan="3" align="center">No appointments found</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {selectedAppointment && (
                        <Dialog open={Boolean(selectedAppointment)} onClose={() => setSelectedAppointment(null)}>
                            <DialogTitle>Add Session</DialogTitle>
                            <DialogContent>
                                <form onSubmit={sessionFormik.handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="session_date"
                                                name="session_date"
                                                label="Session Date"
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                                onChange={sessionFormik.handleChange}
                                                onBlur={sessionFormik.handleBlur}
                                                value={sessionFormik.values.session_date}
                                                error={sessionFormik.touched.session_date && Boolean(sessionFormik.errors.session_date)}
                                                helperText={sessionFormik.touched.session_date && sessionFormik.errors.session_date}
                                                size="small"
                                                readOnly
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="session_fees"
                                                name="session_fees"
                                                label="Session Fees"
                                                type="number"
                                                onChange={sessionFormik.handleChange}
                                                onBlur={sessionFormik.handleBlur}
                                                value={sessionFormik.values.session_fees}
                                                error={sessionFormik.touched.session_fees && Boolean(sessionFormik.errors.session_fees)}
                                                helperText={sessionFormik.touched.session_fees && sessionFormik.errors.session_fees}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="session_type"
                                                name="session_type"
                                                label="Session Type"
                                                onChange={sessionFormik.handleChange}
                                                onBlur={sessionFormik.handleBlur}
                                                value={sessionFormik.values.session_type}
                                                error={sessionFormik.touched.session_type && Boolean(sessionFormik.errors.session_type)}
                                                helperText={sessionFormik.touched.session_type && sessionFormik.errors.session_type}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="session_time"
                                                name="session_time"
                                                label="Session Time"
                                                type="time"
                                                onChange={sessionFormik.handleChange}
                                                onBlur={sessionFormik.handleBlur}
                                                value={sessionFormik.values.session_time}
                                                error={sessionFormik.touched.session_time && Boolean(sessionFormik.errors.session_time)}
                                                helperText={sessionFormik.touched.session_time && sessionFormik.errors.session_time}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="session_status"
                                                name="session_status"
                                                label="Session Status"
                                                onChange={sessionFormik.handleChange}
                                                onBlur={sessionFormik.handleBlur}
                                                value={sessionFormik.values.session_status}
                                                error={sessionFormik.touched.session_status && Boolean(sessionFormik.errors.session_status)}
                                                helperText={sessionFormik.touched.session_status && sessionFormik.errors.session_status}
                                                size="small"
                                            />
                                        </Grid>
                                    </Grid>
                                    <DialogActions>
                                        <Button onClick={() => setSelectedAppointment(null)} color="primary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary" disabled={sessionFormik.isSubmitting}>
                                            Add Session
                                        </Button>
                                    </DialogActions>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                    <Typography variant="h5" component="h3" sx={{ marginTop: '2rem', marginBottom: '1rem', fontWeight: 'bold', color: '#174A90' }}>
                        Doctor Sessions
                    </Typography>
                    {loadingSessions ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#b0e0e6' }}>
                                    <TableRow>
                                        <TableCell>Session ID</TableCell>
                                        <TableCell>Session Date</TableCell>
                                        <TableCell>Session Fees</TableCell>
                                        <TableCell>Session Type</TableCell>
                                        <TableCell>Session Time</TableCell>
                                        <TableCell>Session Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {doctorSessions.length > 0 ? (
                                        doctorSessions.map((session, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{session.session_id}</TableCell>
                                                <TableCell>{session.session_date}</TableCell>
                                                <TableCell>{session.session_fees}</TableCell>
                                                <TableCell>{session.session_type}</TableCell>
                                                <TableCell>{session.session_time}</TableCell>
                                                <TableCell>{session.status}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => { setSelectedSession(session); setPaymentModalOpen(true); }} variant="outlined" color="primary" size="small">
                                                        Request Payment
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan="7" align="center">No doctor sessions found</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {isPaymentModalOpen && (
                        <Dialog open={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)}>
                            <DialogTitle>Request Payment</DialogTitle>
                            <DialogContent>
                                <form onSubmit={paymentFormik.handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="card_number"
                                                name="card_number"
                                                label="Card Number"
                                                onChange={paymentFormik.handleChange}
                                                onBlur={paymentFormik.handleBlur}
                                                value={paymentFormik.values.card_number}
                                                error={paymentFormik.touched.card_number && Boolean(paymentFormik.errors.card_number)}
                                                helperText={paymentFormik.touched.card_number && paymentFormik.errors.card_number}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="bank_account_number"
                                                name="bank_account_number"
                                                label="Bank Account Number"
                                                onChange={paymentFormik.handleChange}
                                                onBlur={paymentFormik.handleBlur}
                                                value={paymentFormik.values.bank_account_number}
                                                error={paymentFormik.touched.bank_account_number && Boolean(paymentFormik.errors.bank_account_number)}
                                                helperText={paymentFormik.touched.bank_account_number && paymentFormik.errors.bank_account_number}
                                                size="small"
                                            />
                                        </Grid>
                                    </Grid>
                                    <DialogActions>
                                        <Button onClick={() => setPaymentModalOpen(false)} color="primary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary" disabled={paymentFormik.isSubmitting}>
                                            Request Payment
                                        </Button>
                                    </DialogActions>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default ManageSessions;
