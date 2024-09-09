import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Products.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

function Products() {
  const [searchedArr, setSearchedArr] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [cartProducts, setCartProducts] = useState(() => {
    const savedCart = localStorage.getItem('cartProducts');
    return savedCart ? JSON.parse(savedCart) : {};
  });
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
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    localStorage.setItem('cartEvents', JSON.stringify(cartEvents));
  }, [cartProducts, cartEvents]);

  const { data: products, error, isLoading } = useQuery('products', fetchProducts, {
    cacheTime: 2000,
    refetchOnMount: false,
  });

  async function fetchProducts() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/products/');
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data.products;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const addToCart = async (productId, quantity = 1, price) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User-Id is missing from local storage');
      }

      const formData = new FormData();
      formData.append('product_id', productId);
      formData.append('quantity', quantity);
      formData.append('price', price);

      const response = await axios.post(
        'http://127.0.0.1:8000/api/cart/productToCart',
        formData,
        {
          headers: {
            'User-Id': userId,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Product added to cart successfully');
      setCartProducts((prevCart) => ({
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
      if (!userId) {
        throw new Error('User-Id is missing from local storage');
      }

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

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Product quantity updated successfully');
      setCartProducts((prevCart) => ({
        ...prevCart,
        [productId]: quantity,
      }));
    } catch (error) {
      console.error('Error updating product quantity:', error);
      toast.error('Failed to update product quantity');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User-Id is missing from local storage');
      }

      const response = await axios.delete(
        `http://127.0.0.1:8000/api/cart/deleteProduct?product_id=${productId}`,
        {
          headers: {
            'user_id': userId,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Product removed from cart successfully');
      setCartProducts((prevCart) => {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      });
    } catch (error) {
      console.error('Error removing product from cart:', error);
      toast.error('Failed to remove product from cart');
    }
  };

  const search = (e) => {
    const term = e.target.value.toLowerCase();
    const newArr = products.filter((product) =>
      product.product_name.toLowerCase().includes(term.trim())
    );
    setSearchedArr(newArr);
  };

  const filterByCategory = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filterByPrice = (e) => {
    setPriceFilter(e.target.value);
  };

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.product_type === categoryFilter
      );
    }

    if (priceFilter === 'lowToHigh') {
      filteredProducts = filteredProducts.sort(
        (a, b) => a.product_price - b.product_price
      );
    } else if (priceFilter === 'highToLow') {
      filteredProducts = filteredProducts.sort(
        (a, b) => b.product_price - a.product_price
      );
    }

    return searchedArr.length > 0 ? searchedArr : filteredProducts;
  };

  return (
    <div className="container mt-5 products-container">
      <h2 className="custom-heading" data-aos="fade-up">
        Our Products
      </h2>
      <Toaster />
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
      {!isLoading && !error && products?.length === 0 && (
        <div className="text-center no-sessions-message">No products found</div>
      )}
      <div className='row'>
        <div className='col-md-9'>
          <TextField
            className='form-control mb-3 search-input'
            fullWidth
            variant="outlined"
            placeholder="Search"
            onChange={search}
            data-aos="fade-up"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
              className: "form-control mb-3 search-input",
            }}
          />
        </div>
        <div className="filters mb-3 col-md-3" data-aos="fade-up">
          <select
            className="form-select category-filter"
            onChange={filterByCategory}
          >
            <option value="">All Categories</option>
            <option value="Books">Books</option>
            <option value="Coloring Books">Coloring Books</option>
            <option value="Medications">Medications</option>
          </select>
          <select className="form-select price-filter" onChange={filterByPrice}>
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </div><div className="row">
  {getFilteredProducts()?.map((product) => (
    <div
      key={product.product_id}
      className="col-md-3 mb-4"
      data-aos="fade-up"
      data-aos-delay={product.product_id * 100}
    >
      <div className="card product-card">
        <div className="card-header">
          <div className="cart-controls">
            {cartProducts[product.product_id] ? (
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <IconButton
                    onClick={() =>
                      cartProducts[product.product_id] === 1
                        ? removeFromCart(product.product_id)
                        : updateProductQuantity(
                          product.product_id,
                          cartProducts[product.product_id] - 1
                        )
                    }
                  >
                    {cartProducts[product.product_id] === 1 ? (
                      <DeleteIcon />
                    ) : (
                      <RemoveIcon />
                    )}
                  </IconButton>
                  <TextField
                    value={cartProducts[product.product_id]}
                    readOnly
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#eaeaea'
                      },
                    }}
                    className="cart-item-quantity-input"
                  />
                  <IconButton
                    onClick={() =>
                      updateProductQuantity(
                        product.product_id,
                        cartProducts[product.product_id] + 1
                      )
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
            ) : (
              <button
                onClick={() =>
                  addToCart(product.product_id, 1, product.product_price)
                }
                className="btn btn-dark btn-cart"
              >
                <AddShoppingCartOutlinedIcon />
              </button>
            )}
          </div>
        </div>
        <div className="card-img-container">
          <img
            className="card-img-top products-imgs"
            src={`http://127.0.0.1:8000/storage/${product.product_image}`}
            alt={product.product_name}
          />
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="font-sm text-main">{product.product_type}</h5>
            <span className="badge bg-secondary">
              {product.product_price} EGP
            </span>
          </div>
          <Link
            to={`/products/${product.product_id}`}
            className="product-link"
          >
            <h4 className="card-product-title">{product.product_name}</h4>
          </Link>
          <p className="card-product-text">
            {product.product_description.substring(0, 60)}...
          </p>
        </div>
      </div>
    </div>
  ))}
  {!isLoading && !error && getFilteredProducts().length === 0 && (
    <div className="text-center no-sessions-message">No products found</div>
  )}
</div>

    </div>
  );
}

export default Products;
