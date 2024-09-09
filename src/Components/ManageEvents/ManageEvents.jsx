import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Box, DialogActions, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Typography, IconButton, Grid, CircularProgress
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './ManageEvents.css';

const validationSchema = Yup.object({
    event_name: Yup.string().required('Event name is required'),
    event_description: Yup.string().required('Event description is required'),
    start_date: Yup.date().required('Start date is required'),
    end_date: Yup.date().required('End date is required'),
    start_time: Yup.string().required('Start time is required'),
    end_time: Yup.string().required('End time is required'),
    event_price: Yup.number().required('Event price is required'),
    event_location: Yup.string().required('Event location is required'),
    event_status: Yup.string().required('Event status is required'),
    image: Yup.mixed().required('Event image is required'),
    number_of_tickets: Yup.number().required('Number of tickets is required')
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

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', backgroundColor: '#f0f4f8', padding: '1rem', borderRadius: '10px', marginTop: '2rem' },
    headerText: { fontWeight: 'bold', color: '#174A90' },
    table: { minWidth: 650 },
    tableHead: { backgroundColor: '#b0e0e6' },  // baby blue color
    modalContent: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', maxHeight: '80vh', overflowY: 'auto', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 },
    formControl: { marginBottom: '1rem' },
    uploadButton: {
        borderRadius: '50px',
        backgroundColor: '#1E90FF',
        color: '#fff',
        padding: '10px 30px',
        '&:hover': {
            backgroundColor: '#1C86EE',
        },
    },
    dialogActions: { display: 'flex', justifyContent: 'center', marginTop: '1rem' },
};

function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/events/');
            setEvents(response.data.events);
        } catch (error) {
            toast.error('Failed to fetch events');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const userId = localStorage.getItem('user_id');
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }

        let url = 'http://127.0.0.1:8000/api/events/store';
        if (currentEvent) {
            formData.append('_method', 'PUT');
            url = `http://127.0.0.1:8000/api/events/update?event_id=${currentEvent.event_id}`;
        }

        try {
            await axios.post(url, formData, {
                headers: {
                    'user_id': userId,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(`Event ${currentEvent ? 'updated' : 'added'} successfully`);
            fetchEvents();
            resetForm();
            setCurrentEvent(null);
            setIsEditing(false);
            setOpen(false);
        } catch (error) {
            toast.error('Failed to submit event');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (eventId) => {
        const userId = localStorage.getItem('user_id');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/events/delete?event_id=${eventId}`, {
                headers: {
                    'user_id': userId
                }
            });
            toast.success('Event deleted successfully');
            fetchEvents();
        } catch (error) {
            toast.error('Failed to delete event');
        }
    };

    const formik = useFormik({
        initialValues: {
            event_name: '',
            event_description: '',
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: '',
            event_price: '',
            event_location: '',
            event_status: '',
            image: null,
            number_of_tickets: ''
        },
        validationSchema,
        onSubmit: handleSubmit,
        enableReinitialize: true
    });

    const handleEdit = (event) => {
        setCurrentEvent(event);
        formik.setValues({
            event_name: event.event_name,
            event_description: event.event_description,
            start_date: event.start_date,
            end_date: event.end_date,
            start_time: event.start_time,
            end_time: event.end_time,
            event_price: event.event_price,
            event_location: event.event_location,
            event_status: event.event_status,
            image: event.image,
            number_of_tickets: event.number_of_tickets
        });
        setIsEditing(true);
        setOpen(true);
    };

    const handleCancel = () => {
        formik.resetForm();
        setCurrentEvent(null);
        setIsEditing(false);
        setOpen(false);
    };

    const handleOpen = () => {
        formik.resetForm();
        setCurrentEvent(null);
        setIsEditing(false);
        setOpen(true);
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
            <Box sx={styles.container} className="container">
                <Box sx={styles.header}>
                    <Typography variant="h4" component="h2" sx={styles.headerText}>Manage Events</Typography>
                    <Button variant="contained" color="primary" onClick={handleOpen}>Add New Event</Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={styles.table}>
                        <TableHead sx={styles.tableHead}>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Tickets</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map(event => (
                                <TableRow key={event.event_id}>
                                    <TableCell>{event.event_id}</TableCell>
                                    <TableCell>{event.event_name}</TableCell>
                                    <TableCell>
                                        <Typography className="event-description">
                                            {event.event_description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{event.start_date}</TableCell>
                                    <TableCell>{event.end_date}</TableCell>
                                    <TableCell>{event.start_time}</TableCell>
                                    <TableCell>{event.end_time}</TableCell>
                                    <TableCell>{event.event_price}</TableCell>
                                    <TableCell>{event.event_location}</TableCell>
                                    <TableCell>{event.event_status}</TableCell>
                                    <TableCell>
                                        <img className="event-img" src={`http://127.0.0.1:8000/storage/${event.image}`} alt={event.event_name} />
                                    </TableCell>
                                    <TableCell>{event.number_of_tickets}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEdit(event)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(event.event_id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal open={open} onClose={handleCancel}>
                    <Box sx={styles.modalContent}>
                        <Typography variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: '1rem'}} color="primary" >
                            {isEditing ? 'Update Event' : 'Add Event'}
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        sx={styles.formControl}
                                        id="event_name"
                                        name="event_name"
                                        label="Event Name"
                                        value={formik.values.event_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.event_name && Boolean(formik.errors.event_name)}
                                        helperText={formik.touched.event_name && formik.errors.event_name}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        sx={styles.formControl}
                                        id="event_description"
                                        name="event_description"
                                        label="Event Description"
                                        value={formik.values.event_description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.event_description && Boolean(formik.errors.event_description)}
                                        helperText={formik.touched.event_description && formik.errors.event_description}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        sx={styles.formControl}
                                        id="start_date"
                                        name="start_date"
                                        label="Start Date"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={formik.values.start_date}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                                        helperText={formik.touched.start_date && formik.errors.start_date}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        sx={styles.formControl}
                                        id="end_date"
                                        name="end_date"
                                        label="End Date"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={formik.values.end_date}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                                        helperText={formik.touched.end_date && formik.errors.end_date}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        sx={styles.formControl}
                                        id="start_time"
                                        name="start_time"
                                        label="Start Time"
                                        type="time"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={formik.values.start_time}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.start_time && Boolean(formik.errors.start_time)}
                                        helperText={formik.touched.start_time && formik.errors.start_time}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        sx={styles.formControl}
                                        id="end_time"
                                        name="end_time"
                                        label="End Time"
                                        type="time"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={formik.values.end_time}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.end_time && Boolean(formik.errors.end_time)}
                                        helperText={formik.touched.end_time && formik.errors.end_time}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        sx={styles.formControl}
                                        id="event_price"
                                        name="event_price"
                                        label="Event Price"
                                        type="number"
                                        value={formik.values.event_price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.event_price && Boolean(formik.errors.event_price)}
                                        helperText={formik.touched.event_price && formik.errors.event_price}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        sx={styles.formControl}
                                        id="event_location"
                                        name="event_location"
                                        label="Event Location"
                                        value={formik.values.event_location}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.event_location && Boolean(formik.errors.event_location)}
                                        helperText={formik.touched.event_location && formik.errors.event_location}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        sx={styles.formControl}
                                        id="event_status"
                                        name="event_status"
                                        label="Event Status"
                                        select
                                        value={formik.values.event_status}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.event_status && Boolean(formik.errors.event_status)}
                                        helperText={formik.touched.event_status && formik.errors.event_status}
                                        size="small"
                                    >
                                        <MenuItem value="Ongoing">Ongoing</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                        <MenuItem value="Upcoming">Upcoming</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        sx={styles.formControl}
                                        id="number_of_tickets"
                                        name="number_of_tickets"
                                        label="Number of Tickets"
                                        type="number"
                                        value={formik.values.number_of_tickets}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.number_of_tickets && Boolean(formik.errors.number_of_tickets)}
                                        helperText={formik.touched.number_of_tickets && formik.errors.number_of_tickets}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        fullWidth
                                        sx={styles.uploadButton}
                                    >
                                        Upload File
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(event) => {
                                                formik.setFieldValue("image", event.currentTarget.files[0]);
                                            }}
                                        />
                                    </Button>
                                    {formik.touched.image && formik.errors.image && (
                                        <Typography color="error" variant="body2">{formik.errors.image}</Typography>
                                    )}
                                </Grid>
                            </Grid>
                            <DialogActions sx={styles.dialogActions}>
                                <Button onClick={handleCancel} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    {isEditing ? 'Update' : 'Add'} Event
                                </Button>
                            </DialogActions>
                        </form>
                    </Box>
                </Modal>
            </Box>
        </ThemeProvider>
    );
}

export default ManageEvents;
