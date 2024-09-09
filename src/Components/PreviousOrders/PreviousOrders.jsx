import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import {
    Container,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Modal,
    Box,
    TextField,
    IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import './PreviousOrders.css';

const PreviousOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
    const [feedbackContent, setFeedbackContent] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const userId = localStorage.getItem('user_id');

    const { data: allOrdersData, isError: allOrdersError } = useQuery(
        'allOrders',
        async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/AllOrders', {
                headers: {
                    'user_id': userId
                }
            });
            return response.data.orders;
        }
    );

    useEffect(() => {
        if (allOrdersData) {
            setAllOrders(allOrdersData);
        }
    }, [allOrdersData]);

    const handleOpenFeedbackModal = (orderId) => {
        setSelectedOrderId(orderId);
        setOpenFeedbackModal(true);
    };

    const handleCloseFeedbackModal = () => {
        setSelectedOrderId(null);
        setFeedbackContent('');
        setRating(0);
        setOpenFeedbackModal(false);
    };

    const handleSubmitFeedback = async () => {
        try {
            if (!selectedOrderId) {
                console.error('Order ID is not available.');
                return;
            }

            const response = await axios.post(
                `http://127.0.0.1:8000/api/feedbacks/makeFeedback?order_id=${selectedOrderId}`,
                {
                    feedback_content: feedbackContent,
                    rating: rating
                },
                {
                    headers: {
                        'user_id': userId
                    }
                }
            );
            if (response.data.success) {
                toast.success('Feedback submitted successfully');
                handleCloseFeedbackModal();
            } else {
                toast.error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            toast.error('Error submitting feedback');
        }
    };

    const handleRating = (value) => {
        setRating(value);
    };

    return (
        <Container className="previous-orders-container mt-5">
            <Toaster />
            <Card className="previous-orders-card">
                <CardHeader title="Previous Orders" className="previous-orders-header" />
                <CardContent className="previous-orders-body">
                    {allOrdersError && (
                        <Typography color="error">Failed to fetch orders</Typography>
                    )}
                    {!allOrdersError && allOrders.length === 0 && (
                        <Typography color="textSecondary">No orders found</Typography>
                    )}
                    {!allOrdersError && allOrders.length > 0 && (
                        allOrders.map(order => (
                            <Card key={order.order_id} className="order-card">
                                <CardContent className="order-card-body">
                                    <div className="order-summary">
                                        <Typography variant="h6">Order Number: {order.order_id}</Typography>
                                        <Typography variant="h6">Order Amount: ${order.order_amount}</Typography>
                                        <Typography variant="h6">Order Quantity: {order.order_quantity}</Typography>
                                        <Typography variant="h6">Order Status: {order.status}</Typography>
                                        <Typography variant="h6">Payment Status: {order.payment_status}</Typography>
                                    </div>
                                    <div className="order-accordion">
                                        {order.order_details.sessions.length > 0 && (
                                            <Accordion>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography>Sessions</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <table className="table table-striped table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>Type</th>
                                                                <th>Date</th>
                                                                <th>Time</th>
                                                                <th>Fees</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {order.order_details.sessions.map(session => (
                                                                <tr key={session.session_id}>
                                                                    <td>{session.session_type}</td>
                                                                    <td>{session.session_date}</td>
                                                                    <td>{session.session_time}</td>
                                                                    <td>${session.session_fees}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}
                                        {order.order_details.products.length > 0 && (
                                            <Accordion>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography>Products</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <table className="table table-striped table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Price</th>
                                                                <th>Quantity</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {order.order_details.products.map(product => (
                                                                <tr key={product.product_id}>
                                                                    <td>{product.product_name}</td>
                                                                    <td>${product.product_price}</td>
                                                                    <td>{product.quantity}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}
                                        {order.order_details.events.length > 0 && (
                                            <Accordion>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography>Events</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <table className="table table-striped table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Price</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {order.order_details.events.map(event => (
                                                                <tr key={event.event_id}>
                                                                    <td>{event.event_name}</td>
                                                                    <td>${event.event_price}</td>
                                                                    <td>{event.event_status}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}
                                    </div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className='mt-2'
                                        onClick={() => handleOpenFeedbackModal(order.order_id)}
                                    >
                                        Leave Feedback
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </CardContent>
            </Card>

            <Modal open={openFeedbackModal} onClose={handleCloseFeedbackModal}>
                <Box className="feedback-modal">
                    <div className="feedback-form">
                        <div className="feedback-header">
                            <Typography variant="h6">How Would You Rate Our App Experience?</Typography>
                        </div>
                        <div className="rating-stars">
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <IconButton
                                        key={index}
                                        className={`star ${starValue <= rating ? 'selected' : ''}`}
                                        onClick={() => handleRating(starValue)}
                                    >
                                        &#9733;
                                    </IconButton>
                                );
                            })}
                        </div>
                        <TextField
                            className="feedback-textarea"
                            multiline
                            rows={5}
                            placeholder="Enter your feedback"
                            value={feedbackContent}
                            onChange={(e) => setFeedbackContent(e.target.value)}
                            fullWidth
                        />
                        <Button
                            className="feedback-submit mt-2"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitFeedback}
                        >
                            Submit Feedback
                        </Button>
                    </div>
                </Box>
            </Modal>
        </Container>
    );
};

export default PreviousOrders;
