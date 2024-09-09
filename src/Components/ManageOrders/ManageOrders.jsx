import React, { useState, useEffect } from 'react';
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
    CircularProgress,
    ThemeProvider,
    createTheme,
    Snackbar,
    MenuItem,
    Select
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAlert from '@mui/material/Alert';

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
    modalContent: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxHeight: '80vh', overflowY: 'auto', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 },
    select: { minWidth: 120 }
};

const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        setLoading(true);
        axios.get('http://127.0.0.1:8000/api/all/orders')
            .then(response => {
                if (response.data.success) {
                    setOrders(response.data.orders);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the orders!', error);
                setLoading(false);
            });
    };

    const handleInfoClick = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    const handleUpdateStatus = (orderId, status) => {
        const userId = localStorage.getItem('user_id');
        const formData = new FormData();
        formData.append('status', status);

        axios.post(`http://127.0.0.1:8000/api/order/update/status?order_id=${orderId}`, formData, {
            headers: {
                'user_id': userId
            }
        })
            .then(response => {
                console.log('Order status updated successfully:', response.data);
                setSnackbarMessage('Order status updated successfully');
                setSnackbarOpen(true);
                setOrders(orders.map(order => order.order_id === orderId ? { ...order, order_status: status } : order));
            })
            .catch(error => {
                console.error('There was an error updating the order status!', error);
                setSnackbarMessage('Error updating order status');
                setSnackbarOpen(true);
            });
    };

    const handleStatusChange = (orderId) => (event) => {
        const newStatus = event.target.value;
        handleUpdateStatus(orderId, newStatus);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
                    <Typography variant="h4" component="h2" sx={styles.headerText}>Manage Orders</Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={styles.table}>
                        <TableHead sx={styles.tableHead}>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>User ID</TableCell>
                                <TableCell>Order Amount</TableCell>
                                <TableCell>Order Quantity</TableCell>
                                <TableCell>Order Status</TableCell>
                                <TableCell>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.order_id}>
                                    <TableCell>{order.order_id}</TableCell>
                                    <TableCell>{order.user_id}</TableCell>
                                    <TableCell>{order.order_amount}</TableCell>
                                    <TableCell>{order.order_quantity}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={order.order_status}
                                            onChange={handleStatusChange(order.order_id)}
                                            displayEmpty
                                            sx={styles.select}
                                        >
                                            <MenuItem value="preorder">preorder</MenuItem>
                                            <MenuItem value="processing">processing</MenuItem>
                                            <MenuItem value="ordered">ordered</MenuItem>
                                            <MenuItem value="shpping">shpping</MenuItem>
                                            <MenuItem value="delivered">delivered</MenuItem>
                                            <MenuItem value="finished">finished</MenuItem>
                                            <MenuItem value="canceled">canceled</MenuItem>
                                            <MenuItem value="returned">returned</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleInfoClick(order)}>
                                            <InfoIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {selectedOrder && (
                    <Dialog open={showModal} onClose={handleCloseModal} fullWidth maxWidth="md">
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogContent>
                            <Box>
                                {selectedOrder.order_details.sessions.length > 0 && (
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography>Sessions</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Session ID</TableCell>
                                                            <TableCell>Type</TableCell>
                                                            <TableCell>Fees</TableCell>
                                                            <TableCell>Time</TableCell>
                                                            <TableCell>Date</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {selectedOrder.order_details.sessions.map(session => (
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
                                {selectedOrder.order_details.products.length > 0 && (
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography>Products</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Product ID</TableCell>
                                                            <TableCell>Name</TableCell>
                                                            <TableCell>Price</TableCell>
                                                            <TableCell>Type</TableCell>
                                                            <TableCell>Quantity</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {selectedOrder.order_details.products.map(product => (
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
                                {selectedOrder.order_details.events.length > 0 && (
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography>Events</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Event ID</TableCell>
                                                            <TableCell>Name</TableCell>
                                                            <TableCell>Date</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {selectedOrder.order_details.events.map(event => (
                                                            <TableRow key={event.event_id}>
                                                                <TableCell>{event.event_id}</TableCell>
                                                                <TableCell>{event.event_name}</TableCell>
                                                                <TableCell>{event.event_date}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </AccordionDetails>
                                    </Accordion>
                                )}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Container>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('Error') ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default ManageOrders;
