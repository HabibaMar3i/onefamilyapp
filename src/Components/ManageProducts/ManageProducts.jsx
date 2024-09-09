import React, { useEffect, useState } from 'react';
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
    DialogTitle,
    TextField,
    IconButton,
    Grid,
    ThemeProvider,
    createTheme,
    CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ManageProducts.css';

const validationSchema = Yup.object({
    product_name: Yup.string().required('Product name is required'),
    product_description: Yup.string().required('Product description is required'),
    product_specification: Yup.string().required('Product specification is required'),
    product_price: Yup.number().required('Product price is required'),
    product_type: Yup.string().required('Product type is required'),
    quantity: Yup.number().required('Quantity is required'),
    product_image: Yup.mixed().required('Product image is required')
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
    container: { marginTop: '2rem' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', backgroundColor: '#f0f4f8', padding: '1rem', borderRadius: '10px' },
    headerText: { fontWeight: 'bold', color: '#174A90' },
    table: { minWidth: 650 },
    tableHead: { backgroundColor: '#b0e0e6' },  // baby blue color
    modalContent: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxHeight: '80vh', overflowY: 'auto', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 },
    formControl: { marginBottom: '1rem' },
    dialogActions: { display: 'flex', justifyContent: 'center', marginTop: '1rem' },
};

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/products/');
            setProducts(response.data.products);
        } catch (error) {
            toast.error('Failed to fetch products');
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

        let url = 'http://127.0.0.1:8000/api/products/store';
        if (currentProduct) {
            formData.append('_method', 'PUT');
            url = `http://127.0.0.1:8000/api/products/update?product_id=${currentProduct.product_id}`;
        }

        try {
            await axios.post(url, formData, {
                headers: {
                    'user_id': userId,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(`Product ${currentProduct ? 'updated' : 'added'} successfully`);
            fetchProducts();
            resetForm();
            setCurrentProduct(null);
            setIsEditing(false);
            setShowModal(false);
        } catch (error) {
            toast.error('Failed to submit product');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (productId) => {
        const userId = localStorage.getItem('user_id');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/products/delete?product_id=${productId}`, {
                headers: {
                    'user_id': userId
                }
            });
            toast.success('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    const formik = useFormik({
        initialValues: {
            product_name: '',
            product_description: '',
            product_specification: '',
            product_price: '',
            product_type: '',
            quantity: '',
            product_image: null
        },
        validationSchema,
        onSubmit: handleSubmit,
        enableReinitialize: true
    });

    const handleEdit = (product) => {
        setCurrentProduct(product);
        formik.setValues({
            product_name: product.product_name,
            product_description: product.product_description,
            product_specification: product.product_specification,
            product_price: product.product_price,
            product_type: product.product_type,
            quantity: product.quantity,
            product_image: product.product_image
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleCancel = () => {
        formik.resetForm();
        setCurrentProduct(null);
        setIsEditing(false);
        setShowModal(false);
    };

    const openModal = () => {
        formik.resetForm();
        setCurrentProduct(null);
        setIsEditing(false);
        setShowModal(true);
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
                    <Typography variant="h4" component="h2" sx={styles.headerText}>Manage Products</Typography>
                    <Button variant="contained" color="primary" onClick={openModal}>Add New Product</Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={styles.table}>
                        <TableHead sx={styles.tableHead}>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map(product => (
                                <TableRow key={product.product_id}>
                                    <TableCell>{product.product_id}</TableCell>
                                    <TableCell>{product.product_name}</TableCell>
                                    <TableCell>{product.product_price}</TableCell>
                                    <TableCell>{product.product_type}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>
                                        <img className="product-img" src={`http://127.0.0.1:8000/storage/${product.product_image}`} alt={product.product_name} />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEdit(product)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(product.product_id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={showModal} onClose={handleCancel}>
                    <Typography variant="h6" component="h2" sx={{ textAlign: 'center', marginTop: '1rem' }} color="primary" >
                        {isEditing ? 'Update Product' : 'Add Product'}
                    </Typography>
                    <DialogContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="product_name"
                                        label="Product Name"
                                        name="product_name"
                                        value={formik.values.product_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.product_name && Boolean(formik.errors.product_name)}
                                        helperText={formik.touched.product_name && formik.errors.product_name}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="product_description"
                                        label="Product Description"
                                        name="product_description"
                                        value={formik.values.product_description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.product_description && Boolean(formik.errors.product_description)}
                                        helperText={formik.touched.product_description && formik.errors.product_description}
                                        size="small"
                                        multiline
                                        rows={2}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="product_specification"
                                        label="Product Specification"
                                        name="product_specification"
                                        value={formik.values.product_specification}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.product_specification && Boolean(formik.errors.product_specification)}
                                        helperText={formik.touched.product_specification && formik.errors.product_specification}
                                        size="small"
                                        multiline
                                        rows={2}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="product_price"
                                        label="Product Price"
                                        name="product_price"
                                        type="number"
                                        value={formik.values.product_price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.product_price && Boolean(formik.errors.product_price)}
                                        helperText={formik.touched.product_price && formik.errors.product_price}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="product_type"
                                        label="Product Type"
                                        name="product_type"
                                        value={formik.values.product_type}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.product_type && Boolean(formik.errors.product_type)}
                                        helperText={formik.touched.product_type && formik.errors.product_type}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="quantity"
                                        label="Quantity"
                                        name="quantity"
                                        type="number"
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                        helperText={formik.touched.quantity && formik.errors.quantity}
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
                                                formik.setFieldValue("product_image", event.currentTarget.files[0]);
                                            }}
                                        />
                                    </Button>
                                    {formik.touched.product_image && formik.errors.product_image && (
                                        <Typography color="error" variant="body2">{formik.errors.product_image}</Typography>
                                    )}
                                </Grid>
                            </Grid>
                            <DialogActions sx={styles.dialogActions}>
                                <Button onClick={handleCancel} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    {isEditing ? 'Update' : 'Add'} Product
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
}

export default ManageProducts;
