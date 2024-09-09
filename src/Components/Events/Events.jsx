import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Events.css'; // Import your custom CSS for additional styling
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, TextField, Button } from '@mui/material';

function Events() {
  const { data: events, isLoading, error } = useQuery('events', fetchEvents);
  const [cartEvents, setCartEvents] = useState(() => {
    const savedCart = localStorage.getItem('cartEvents');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('cartEvents', JSON.stringify(cartEvents));
  }, [cartEvents]);

  async function fetchEvents() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/events/');
      return response.data.events;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to fetch events');
    }
  }

  const addToCart = async (eventId) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User-Id is missing from local storage');
      }

      const response = await axios.post(`http://127.0.0.1:8000/api/cart/eventToCart?event_id=${eventId}`, null, {
        headers: {
          'User-Id': userId,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Event added to cart successfully');
      setCartEvents((prevCart) => ({
        ...prevCart,
        [eventId]: (prevCart[eventId] || 0) + 1,
      }));
    } catch (error) {
      console.error('Error adding event to cart:', error);
      toast.error('Failed to add event to cart');
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
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Event tickets updated successfully');
      setCartEvents((prevCart) => ({
        ...prevCart,
        [eventId]: numberOfTickets,
      }));
    } catch (error) {
      console.error('Error updating event tickets:', error);
      toast.error('Failed to update event tickets');
    }
  };

  const removeFromCart = async (eventId) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User-Id is missing from local storage');
      }

      const response = await axios.delete(`http://127.0.0.1:8000/api/cart/deleteEvent?event_id=${eventId}`, {
        headers: {
          'user_id': userId,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Event removed from cart successfully');
      setCartEvents((prevCart) => {
        const newCart = { ...prevCart };
        delete newCart[eventId];
        return newCart;
      });
    } catch (error) {
      console.error('Error removing event from cart:', error);
      toast.error('Failed to remove event from cart');
    }
  };

  const getStatusIconAndColor = (status) => {
    switch (status) {
      case 'Ongoing':
        return { icon: 'fa-spinner', color: 'text-primary' };
      case 'Upcoming':
        return { icon: 'fa-hourglass-start', color: 'text-warning' };
      case 'Completed':
        return { icon: 'fa-check-circle', color: 'text-success' };
      default:
        return { icon: 'fa-question-circle', color: 'text-muted' };
    }
  };

  return (
    <div className="container my-5 event-container">
      <div className="custom-heading-container">
        <h2 className="custom-heading" data-aos="fade-up">Kids Events</h2>
      </div>
      {isLoading && (
        <div className="text-center loader-container">
          <ClipLoader color="#D85207" size={80} />
          <p className="loading-text">Loading...</p>
        </div>
      )}
      {error && (
        <div className="text-center text-danger">
          An error has occurred: {error.message}
        </div>
      )}
      {!isLoading && !error && events?.length === 0 && (
        <div className="text-center no-sessions-message">No events found</div>
      )}
      <div className="row row-cols-1 row-cols-md-2 g-4 event-card-grid">
        {events?.map((event) => (
          <div className="col" key={event.event_id} data-aos="fade-up" data-aos-delay={event.event_id * 100}>
            <div className="event-card shadow-sm d-flex flex-column">
              <div className="event-card-image">
                <img src={`http://127.0.0.1:8000/storage/${event.image}`} alt={event.event_name} />
              </div>
              <div className="event-card-content p-4">
                <div className="event-card-date mb-2">
                  <span>{new Date(event.start_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span> - <span>{new Date(event.end_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>
                <h5 className="event-card-title mb-3">{event.event_name}</h5>
                <p className="event-card-description mb-3">{event.event_description}</p>
                <div className="event-card-meta mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa-solid fa-map-marker-alt me-2 text-muted"></i>
                    <small className="text-muted">{event.event_location}</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className={`fa-solid ${getStatusIconAndColor(event.event_status).icon} ${getStatusIconAndColor(event.event_status).color} me-2`}></i>
                    <small className={getStatusIconAndColor(event.event_status).color}>
                      {event.event_status}
                    </small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa-solid fa-clock me-2 text-muted"></i>
                    <small className="text-muted">{event.start_time} - {event.end_time}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fa-solid fa-ticket-alt me-2 text-muted"></i>
                    <small className="text-muted">Tickets: {event.number_of_tickets}</small>
                  </div>
                </div>
                <div className="event-card-actions text-end mt-auto">
                  {cartEvents[event.event_id] ? (
                    <div className="d-flex align-items-center justify-content-end">
                      <IconButton onClick={() => cartEvents[event.event_id] === 1 ? removeFromCart(event.event_id) : updateEventTickets(event.event_id, cartEvents[event.event_id] - 1)}>
                        {cartEvents[event.event_id] === 1 ? <DeleteIcon /> : <RemoveIcon />}
                      </IconButton>
                      <TextField
                        value={cartEvents[event.event_id]}
                        readOnly
                        variant="outlined"
                        inputProps={{ style: { textAlign: 'center', width: '40px', height: '40px' } }}
                        className="cart-item-quantity-input"
                      />
                      <IconButton onClick={() => updateEventTickets(event.event_id, cartEvents[event.event_id] + 1)}>
                        <AddIcon />
                      </IconButton>
                      {cartEvents[event.event_id] > 1 && (
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => removeFromCart(event.event_id)}
                          className="cart-item-remove-btn"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ) : (
                    event.event_status === 'Ongoing' && (
                      <IconButton onClick={() => addToCart(event.event_id)} className="btn btn-dark">
                        <ShoppingCartIcon />
                      </IconButton>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
