import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
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
    TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './LatestOrder.css';

const LatestOrder = () => {
    const [voucherCode, setVoucherCode] = useState('');
    const [orderAmount, setOrderAmount] = useState(0);
    const [voucherApplied, setVoucherApplied] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');

    const { data: latestOrderData, isError: latestOrderError, refetch: refetchLatestOrder } = useQuery(
        'latestOrder',
        async () => {
            const response = await axios.get('http://127.0.0.1:8000/MyOrder', {
                headers: {
                    'user_id': userId
                }
            });
            return response.data.order;
        },
        {
            onSuccess: (data) => {
                setOrderAmount(data.order_amount);
            }
        }
    );

    const applyVoucherMutation = useMutation(
        (voucherCode) => axios.post(`http://127.0.0.1:8000/api/applyVoucher/?order_id=${latestOrderData?.order_id}`, { voucher_code: voucherCode }, {
            headers: {
                'user_id': userId
            }
        }),
        {
            onSuccess: (response) => {
                if (response.data.success) {
                    toast.success('Voucher applied successfully');
                    setOrderAmount(response.data.new_order_amount);
                    setVoucherApplied(true);
                    refetchLatestOrder();
                } else {
                    toast.error('Failed to apply voucher');
                }
            },
            onError: () => {
                toast.error('Failed to apply voucher');
            }
        }
    );

    const cancelVoucherMutation = useMutation(
        () => axios.post(`http://127.0.0.1:8000/api/cancel/voucher/?order_id=${latestOrderData?.order_id}`, {}, {
            headers: {
                'user_id': userId
            }
        }),
        {
            onSuccess: (response) => {
                if (response.data.success) {
                    toast.success('Voucher canceled successfully');
                    setOrderAmount(response.data.new_order_amount);
                    setVoucherCode(''); // Reset voucher code field
                    setVoucherApplied(false);
                    refetchLatestOrder();
                } else {
                    toast.error('Failed to cancel voucher');
                }
            },
            onError: () => {
                toast.error('Failed to cancel voucher');
            }
        }
    );

    const confirmPayment = async (orderId) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/confirmPayment?order_id=${orderId}`, {}, {
                headers: {
                    'user_id': userId
                }
            });

            if (response.data.success) {
                window.location.href = response.data.checkout_url;
            } else {
                toast.error('Failed to confirm payment');
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            toast.error('Failed to confirm payment');
        }
    };

    const handleApplyVoucher = async () => {
        try {
            await applyVoucherMutation.mutateAsync(voucherCode);
        } catch (error) {
            console.error('Error applying voucher:', error);
        }
    };

    const handleCancelVoucher = async () => {
        try {
            await cancelVoucherMutation.mutateAsync();
        } catch (error) {
            console.error('Error canceling voucher:', error);
        }
    };

    return (
        <Container className="latest-order-container mt-5">
            <Toaster />
            <Card className="latest-order-card">
                <CardHeader title="Confirm Your Order" className="latest-order-header" />
                <CardContent className="latest-order-body">
                    {latestOrderError && (
                        <Typography color="error">Failed to fetch the latest order</Typography>
                    )}
                    {!latestOrderError && latestOrderData && (
                        <>
                            <div className="order-summary">
                                <Typography variant="h6">Order Number: {latestOrderData.order_id}</Typography>
                                <Typography variant="h6">Order Amount: {orderAmount} EGP</Typography>
                            </div>
                            <div className="order-accordion">
                                {latestOrderData.order_details.sessions.length > 0 && (
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
                                                    {latestOrderData.order_details.sessions.map(session => (
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
                                {latestOrderData.order_details.products.length > 0 && (
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
                                                    {latestOrderData.order_details.products.map(product => (
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
                                {latestOrderData.order_details.events.length > 0 && (
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
                                                    {latestOrderData.order_details.events.map(event => (
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
                            <div className="voucher-section">
                                <TextField
                                    label="Voucher Code"
                                    variant="outlined"
                                    fullWidth
                                    value={voucherCode}
                                    onChange={(e) => setVoucherCode(e.target.value)}
                                    className="voucher-input"
                                    InputProps={{
                                        style: {
                                            height: '56px' // Match height of buttons
                                        }
                                    }}
                                    disabled={voucherApplied} // Disable input if voucher is applied
                                />
                                <div className="voucher-actions">
                                    {!voucherApplied ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleApplyVoucher}
                                            className="btn-voucher"
                                        >
                                            Apply Voucher
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={handleCancelVoucher}
                                            className="btn-voucher"
                                            sx={{
                                                borderColor: 'blue',
                                                color: 'blue'
                                            }}
                                        >
                                            Cancel Voucher
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="actions-section">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => confirmPayment(latestOrderData.order_id)}
                                    className="btn-confirm"
                                >
                                    Proceed to Pay
                                </Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default LatestOrder;

