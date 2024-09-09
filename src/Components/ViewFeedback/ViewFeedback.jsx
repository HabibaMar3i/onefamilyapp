import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    Typography,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
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
    Rating,
    ThemeProvider,
    createTheme
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewFeedback.css';

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
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', backgroundColor: '#f0f4f8', padding: '1rem', borderRadius: '10px' },
    headerText: { fontWeight: 'bold', color: '#174A90' },
    table: { minWidth: 650 },
    tableHead: { backgroundColor: '#b0e0e6' },  // baby blue color
    accordionSummary: { backgroundColor: '#f0f4f8', borderRadius: '10px' },
    modalContent: { maxHeight: '80vh', overflowY: 'auto' }
};

const ViewFeedback = () => {
    const { data: responseData, isLoading, isError } = useQuery('feedbacks', async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/feedbacks/');
        return response.data;
    });

    const feedbackData = responseData?.feedback || [];
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const handleInfoClick = (feedback) => {
        setSelectedFeedback(feedback);
    };

    const handleCloseModal = () => {
        setSelectedFeedback(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container sx={styles.container}>
                <Box sx={styles.header}>
                    <Typography variant="h4" component="h1" sx={styles.headerText}>View Feedback</Typography>
                </Box>
                {isLoading && <Typography>Loading...</Typography>}
                {isError && <Typography color="error">Error fetching feedback data</Typography>}
                {feedbackData.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table sx={styles.table}>
                            <TableHead sx={styles.tableHead}>
                                <TableRow>
                                    <TableCell>Feedback ID</TableCell>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {feedbackData.map((feedback) => (
                                    <TableRow key={feedback.feedback_id}>
                                        <TableCell>{feedback.feedback_id}</TableCell>
                                        <TableCell>{feedback.order_id}</TableCell>
                                        <TableCell>{feedback.first_name} {feedback.last_name}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => handleInfoClick(feedback)}>
                                                <InfoIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography>No feedback available</Typography>
                )}

                {selectedFeedback && (
                    <Dialog open={Boolean(selectedFeedback)} onClose={handleCloseModal} fullWidth maxWidth="md">
                        <DialogTitle>Feedback Details</DialogTitle>
                        <DialogContent sx={styles.modalContent}>
                            <Typography><strong>Feedback Content:</strong> {selectedFeedback.feedback_content}</Typography>
                            <Typography><strong>Rating:</strong> <Rating name="read-only" value={selectedFeedback.rating} readOnly /></Typography>
                            {selectedFeedback.order_details.sessions.length > 0 && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Sessions</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer component={Paper}>
                                            <Table sx={styles.table}>
                                                <TableHead sx={styles.tableHead}>
                                                    <TableRow>
                                                        <TableCell>Session ID</TableCell>
                                                        <TableCell>Type</TableCell>
                                                        <TableCell>Fees</TableCell>
                                                        <TableCell>Time</TableCell>
                                                        <TableCell>Date</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {selectedFeedback.order_details.sessions.map(session => (
                                                        <TableRow key={session.session_id}>
                                                            <TableCell>{session.session_id}</TableCell>
                                                            <TableCell>{session.session_type}</TableCell>
                                                            <TableCell>{session.session_fees}</TableCell>
                                                            <TableCell>{session.session_time}</TableCell>
                                                            <TableCell>{session.session_date}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                            {selectedFeedback.order_details.products.length > 0 && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Products</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer component={Paper}>
                                            <Table sx={styles.table}>
                                                <TableHead sx={styles.tableHead}>
                                                    <TableRow>
                                                        <TableCell>Product ID</TableCell>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Price</TableCell>
                                                        <TableCell>Type</TableCell>
                                                        <TableCell>Quantity</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {selectedFeedback.order_details.products.map(product => (
                                                        <TableRow key={product.product_id}>
                                                            <TableCell>{product.product_id}</TableCell>
                                                            <TableCell>{product.product_name}</TableCell>
                                                            <TableCell>{product.product_price}</TableCell>
                                                            <TableCell>{product.product_type}</TableCell>
                                                            <TableCell>{product.quantity}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                            {selectedFeedback.order_details.events.length > 0 && (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Events</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer component={Paper}>
                                            <Table sx={styles.table}>
                                                <TableHead sx={styles.tableHead}>
                                                    <TableRow>
                                                        <TableCell>Event ID</TableCell>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Date</TableCell>
                                                        <TableCell>Price</TableCell>
                                                        <TableCell>Status</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {selectedFeedback.order_details.events.map(event => (
                                                        <TableRow key={event.event_id}>
                                                            <TableCell>{event.event_id}</TableCell>
                                                            <TableCell>{event.event_name}</TableCell>
                                                            <TableCell>{event.event_date}</TableCell>
                                                            <TableCell>{event.event_price}</TableCell>
                                                            <TableCell>{event.event_status}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Container>
        </ThemeProvider>
    );
};

export default ViewFeedback;


