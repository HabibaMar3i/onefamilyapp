import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './Cart.css';

function Cart() {
  const [cartData, setCartData] = useState(null);
  const [cartProducts, setCartProducts] = useState(() => {
    const savedCart = localStorage.getItem('cartProducts');
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [cartEvents, setCartEvents] = useState(() => {
    const savedCart = localStorage.getItem('cartEvents');
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    localStorage.setItem('cartEvents', JSON.stringify(cartEvents));
  }, [cartProducts, cartEvents]);

  const fetchCartData = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User-Id is missing from local storage');
      }

      const response = await axios.get('http://127.0.0.1:8000/api/cart', {
        headers: {
          'user_id': userId
        }
      });

      setCartData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch cart data');
      setIsLoading(false);
      console.error('Error fetching cart data:', error);
    }
  };

  const removeFromCart = async (itemId, itemType) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User-Id is missing from local storage');
      }

      let deleteEndpoint = '';
      switch (itemType) {
        case 'session':
          deleteEndpoint = `http://127.0.0.1:8000/api/cart/deleteSession?session_id=${itemId}`;
          break;
        case 'product':
          deleteEndpoint = `http://127.0.0.1:8000/api/cart/deleteProduct?product_id=${itemId}`;
          break;
        case 'event':
          deleteEndpoint = `http://127.0.0.1:8000/api/cart/deleteEvent?event_id=${itemId}`;
          break;
        default:
          throw new Error('Invalid item type');
      }

      const response = await axios.delete(deleteEndpoint, {
        headers: {
          'user_id': userId
        }
      });

      if (response.data.success) {
        toast.success('Item removed from cart successfully');
        if (itemType === 'product') {
          setCartProducts((prevCart) => {
            const newCart = { ...prevCart };
            delete newCart[itemId];
            return newCart;
          });
        } else if (itemType === 'event') {
          setCartEvents((prevCart) => {
            const newCart = { ...prevCart };
            delete newCart[itemId];
            return newCart;
          });
        }
        fetchCartData(); // Refresh cart data after deletion
      } else {
        throw new Error(response.data.message || 'Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const updateProductQuantity = async (productId, quantity) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User-Id is missing from local storage');
      }

      const formData = new FormData();
      formData.append('quantity', quantity);

      const response = await axios.post(`http://127.0.0.1:8000/api/cart/editCart?product_id=${productId}&_method=put`, formData, {
        headers: {
          'user_id': userId,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success('Product quantity updated successfully');
        setCartProducts((prevCart) => ({
          ...prevCart,
          [productId]: quantity,
        }));
        fetchCartData(); // Refresh cart data after updating quantity
      } else {
        throw new Error(response.data.message || 'Failed to update product quantity');
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
      toast.error('Failed to update product quantity');
    }
  };

  const updateEventTickets = async (eventId, numberOfTickets) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User-Id is missing from local storage');
      }

      const formData = new FormData();
      formData.append('number_of_tickets', numberOfTickets);

      const response = await axios.post(`http://127.0.0.1:8000/api/cart/update/event`, formData, {
        headers: {
          'user_id': userId,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success('Event tickets updated successfully');
        setCartEvents((prevCart) => ({
          ...prevCart,
          [eventId]: numberOfTickets,
        }));
        fetchCartData(); // Refresh cart data after updating tickets
      } else {
        throw new Error(response.data.message || 'Failed to update event tickets');
      }
    } catch (error) {
      console.error('Error updating event tickets:', error);
      toast.error('Failed to update event tickets');
    }
  };

  const proceedToOrder = async (cartId) => {
    try {
      const userId = localStorage.getItem('user_id');
      const response = await axios.post(`http://127.0.0.1:8000/api/confirmOrder?cart_id=${cartId}`, null, {
        headers: {
          'user_id': userId
        }
      });

      if (response.data.success) {
        toast.success('Order placed successfully!');
        localStorage.removeItem("cartProducts");
        localStorage.removeItem("cartEvents");
        navigate('/latestorder');
      } else {
        throw new Error(response.data.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  if (isLoading) {
    return <div className="text-center loader-container">
      <ClipLoader color="#D85207" size={80} />
      <p className="loading-text">Loading...</p>
    </div>;
  }

  if (error) {
    toast.error('Failed to fetch cart data');
    return <Typography variant="h6" color="error" textAlign="center">An error has occurred</Typography>;
  }

  return (
    <Container className="cart-container">
      <h2 className="custom-heading">Your Cart</h2>
      {cartData && (
        <Box className="cart-content">
          <Box className="cart-summary">
            <Typography variant="body1" color="primary">
              Cart Items: {cartData.quantity}
            </Typography>
            <Typography variant="h5" color="primary">
              Total Cart Price: {cartData.totalamount} EGP
            </Typography>
          </Box>
          {cartData.cart.products.length > 0 && (
            <Box className="cart-products">
              <Typography variant="h5" className="cart-section-title">Products</Typography>
              {cartData.cart.products.map(product => (
                <Card key={product.product_id} className="cart-item-card">
                  <CardMedia
                    component="img"
                    className="cart-item-image"
                    image={`http://127.0.0.1:8000/storage/${product.product_image}`}
                    alt={product.product_name}
                  />
                  <Box className="cart-item-details">
                    <CardContent>
                      <Typography variant="h5" className="cart-item-name">{product.product_name}</Typography>
                      <Typography variant="body1" className="cart-item-price">Price: {product.product_price} EGP</Typography>
                      {product.quantity > 1 && (
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => removeFromCart(product.product_id, 'product')} className="cart-item-remove-btn">
                          Remove
                        </Button>
                      )}
                    </CardContent>
                  </Box>
                  <Box className="cart-item-quantity">
                    <IconButton onClick={() => product.quantity === 1 ? removeFromCart(product.product_id, 'product') : updateProductQuantity(product.product_id, product.quantity - 1)}>
                      {product.quantity === 1 ? <DeleteIcon /> : <RemoveIcon />}
                    </IconButton>
                    <TextField
                      value={product.quantity}
                      readOnly
                      variant="outlined"
                      inputProps={{ style: { textAlign: 'center', width: '40px', height: '40px' } }}
                      className="cart-item-quantity-input"
                    />
                    <IconButton onClick={() => updateProductQuantity(product.product_id, product.quantity + 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Box>
          )}
          {cartData.cart.events.length > 0 && (
            <Box className="cart-events">
              <Typography variant="h5" className="cart-section-title">Events</Typography>
              {cartData.cart.events.map(event => (
                <Card key={event.event_id} className="cart-item-card">
                  <CardMedia
                    component="img"
                    className="cart-item-image"
                    image={`http://localhost:8000/storage/${event.image}`}
                    alt={event.event_name}
                  />
                  <Box className="cart-item-details">
                    <CardContent>
                      <Typography variant="h5" className="cart-item-name">{event.event_name}</Typography>
                      <Typography variant="body1" className="cart-item-price">Price: {event.event_price} EGP</Typography>
                      <Typography variant="body1" className="cart-item-location">Location: {event.event_location}</Typography>
                      {cartData.number_of_tickets > 1 && (
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => removeFromCart(event.event_id, 'event')} className="cart-item-remove-btn">
                          Remove
                        </Button>
                      )}
                    </CardContent>
                  </Box>
                  <Box className="cart-item-quantity">
                    <IconButton onClick={() => cartData.number_of_tickets === 1 ? removeFromCart(event.event_id, 'event') : updateEventTickets(event.event_id, cartData.number_of_tickets - 1)}>
                      {cartData.number_of_tickets === 1 ? <DeleteIcon /> : <RemoveIcon />}
                    </IconButton>
                    <TextField
                      value={cartData.number_of_tickets}
                      readOnly
                      variant="outlined"
                      inputProps={{ style: { textAlign: 'center', width: '40px', height: '40px' } }}
                      className="cart-item-quantity-input"
                    />
                    <IconButton onClick={() => updateEventTickets(event.event_id, cartData.number_of_tickets + 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Box>
          )}
          {cartData.cart.sessions.length > 0 && (
            <Box className="cart-sessions">
              <Typography variant="h5" className="cart-section-title">Sessions</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {cartData.cart.sessions.map(session => (
                      <TableRow key={session.session_id}>
                        <TableCell>{session.session_type}</TableCell>
                        <TableCell>{session.session_date}</TableCell>
                        <TableCell>{session.session_time}</TableCell>
                        <TableCell>{session.session_fees} EGP</TableCell>
                        <TableCell>
                          <IconButton onClick={() => removeFromCart(session.session_id, 'session')}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          {cartData.totalamount > 0 && (
            <Box display="flex" justifyContent="flex-end" className="cart-order-btn">
              <Button variant="contained" color="primary" onClick={() => proceedToOrder(cartData.cart_id)}>
                Proceed to Order
              </Button>
            </Box>
          )}
        </Box>
      )}
      {!cartData && <Typography variant="body1">No items in the cart</Typography>}
    </Container>
  );
}

export default Cart;
