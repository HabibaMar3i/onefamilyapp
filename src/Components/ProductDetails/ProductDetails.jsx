import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './ProductDetails.css';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
function ProductDetails() {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [cartProducts, setCartProducts] = useState(() => {
        const savedCart = localStorage.getItem('cartProducts');
        return savedCart ? JSON.parse(savedCart) : {};
    });

    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }, [cartProducts]);

    const { data: product, error, isLoading } = useQuery(['product', productId], () =>
        axios.get(`http://127.0.0.1:8000/products/show?product_id=${productId}`).then(res => {
            if (!res.data.success) throw new Error(res.data.message);
            return res.data.product;
        })
    );

    const addToCart = async (productId, quantity, price) => {
        try {
            const userId = localStorage.getItem('user_id');
            if (!userId) throw new Error('User-Id is missing from local storage');

            const formData = new FormData();
            formData.append('product_id', productId);
            formData.append('quantity', quantity);
            formData.append('price', price);

            const response = await axios.post('http://127.0.0.1:8000/api/cart/productToCart', formData, {
                headers: {
                    'User-Id': userId,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.data.success) throw new Error(response.data.message);

            toast.success('Product added to cart successfully');
            setCartProducts(prevCart => ({
                ...prevCart,
                [productId]: (prevCart[productId] || 0) + quantity,
            }));
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart');
        }
    };

    const updateProductQuantity = async (productId, quantity) => {
        try {
            const userId = localStorage.getItem('user_id');
            if (!userId) throw new Error('User-Id is missing from local storage');

            const formData = new FormData();
            formData.append('quantity', quantity);

            const response = await axios.post(
                `http://127.0.0.1:8000/api/cart/editCart?product_id=${productId}&_method=put`,
                formData,
                {
                    headers: {
                        'user_id': userId,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (!response.data.success) throw new Error(response.data.message);

            toast.success('Product quantity updated successfully');
            setCartProducts(prevCart => ({
                ...prevCart,
                [productId]: quantity,
            }));
        } catch (error) {
            console.error('Error updating product quantity:', error);
            toast.error('Failed to update product quantity');
        }
    };

    const removeFromCart = async productId => {
        try {
            const userId = localStorage.getItem('user_id');
            if (!userId) throw new Error('User-Id is missing from local storage');

            const response = await axios.delete(
                `http://127.0.0.1:8000/api/cart/deleteProduct?product_id=${productId}`,
                {
                    headers: {
                        'user_id': userId,
                    },
                }
            );

            if (!response.data.success) throw new Error(response.data.message);

            toast.success('Product removed from cart successfully');
            setCartProducts(prevCart => {
                const newCart = { ...prevCart };
                delete newCart[productId];
                return newCart;
            });
        } catch (error) {
            console.error('Error removing product from cart:', error);
            toast.error('Failed to remove product from cart');
        }
    };

    const updateQuantity = newQuantity => {
        if (newQuantity > 0) setQuantity(newQuantity);
    };

    if (isLoading) {
        return <div className="loader-container"><ClipLoader color="#ff6f61" size={60} /></div>;
    }

    if (error) {
        return <div className="text-center text-danger">An error has occurred: {error.message}</div>;
    }

    return (
        <div className="product-details-container">
            <Toaster />
            <div className="product-details-card">
                <img
                    src={`http://127.0.0.1:8000/storage/${product.product_image}`}
                    alt={product.product_name}
                    className="product-image"
                />
                <div className="product-details-content">
                    <h2 className="product-title">{product.product_name}</h2>
                    <p className="product-description">{product.product_description}</p>
                    <p className="product-specification"><strong>Specification:</strong> {product.product_specification}</p>
                    <p className="product-quantity"><strong>Available Quantity:</strong> {product.quantity}</p>
                    <div className="product-meta">
                        <p className="product-type">{product.product_type}</p>
                        <p className="product-price">{product.product_price} EGP</p>
                    </div>
                    {cartProducts[product.product_id] ? (
                        <div className="cart-actions">
                            <button
                                className="icon-button"
                                onClick={() =>
                                    cartProducts[product.product_id] === 1
                                        ? removeFromCart(product.product_id)
                                        : updateProductQuantity(product.product_id, cartProducts[product.product_id] - 1)
                                }
                            >
                                {cartProducts[product.product_id] === 1 ? <DeleteIcon /> : <RemoveIcon />}
                            </button>
                            <input
                                type="text"
                                value={cartProducts[product.product_id]}
                                readOnly
                                className="cart-item-quantity-input"
                            />
                            <button
                                className="icon-button"
                                onClick={() => updateProductQuantity(product.product_id, cartProducts[product.product_id] + 1)}
                            >
                                <AddIcon />
                            </button>
                            {cartProducts[product.product_id] > 1 && (
                                <button
                                    className="cart-item-remove-btn"
                                    onClick={() => removeFromCart(product.product_id)}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(product.product_id, quantity, product.product_price)}
                            className="add-to-cart-button"
                        >
                <AddShoppingCartOutlinedIcon />
                </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
