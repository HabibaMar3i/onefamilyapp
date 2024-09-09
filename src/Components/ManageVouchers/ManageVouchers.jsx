import React, { useState, useEffect } from 'react';
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
import './ManageVouchers.css';

const validationSchema = Yup.object({
    voucher_code: Yup.string().required('Voucher code is required'),
    voucher_percentage: Yup.number().min(0).max(100).required('Voucher percentage is required'),
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
    modalContent: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', maxHeight: '80vh', overflowY: 'auto', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 },
    formControl: { marginBottom: '1rem' },
    dialogActions: { display: 'flex', justifyContent: 'center', marginTop: '1rem' },
};

function ManageVouchers() {
    const [vouchers, setVouchers] = useState([]);
    const [currentVoucher, setCurrentVoucher] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/vouchers/');
            if (response.data.vouchers) {
                setVouchers(response.data.vouchers);
            }
        } catch (error) {
            toast.error('Failed to fetch vouchers');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const userId = localStorage.getItem('user_id');
        const formData = new FormData();
        formData.append('voucher_code', values.voucher_code);
        formData.append('voucher_percentage', values.voucher_percentage);

        let url = 'http://127.0.0.1:8000/api/vouchers/store';
        if (currentVoucher) {
            formData.append('_method', 'PUT');
            url = `http://127.0.0.1:8000/api/vouchers/update?voucher_id=${currentVoucher.voucher_id}`;
        }

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    user_id: userId,
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success(`Voucher ${currentVoucher ? 'updated' : 'added'} successfully`);
            fetchVouchers();
            resetForm();
            setCurrentVoucher(null);
            setIsEditing(false);
            setShowModal(false);
        } catch (error) {
            toast.error('Failed to submit voucher');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (voucherId) => {
        const userId = localStorage.getItem('user_id');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/vouchers/delete?voucher_id=${voucherId}`, {
                headers: {
                    user_id: userId,
                },
            });
            toast.success('Voucher deleted successfully');
            fetchVouchers();
        } catch (error) {
            toast.error('Failed to delete voucher');
        }
    };

    const formik = useFormik({
        initialValues: {
            voucher_code: '',
            voucher_percentage: '',
        },
        validationSchema,
        onSubmit: handleSubmit,
        enableReinitialize: true,
    });

    const handleEdit = (voucher) => {
        setCurrentVoucher(voucher);
        formik.setValues({
            voucher_code: voucher.voucher_code,
            voucher_percentage: voucher.voucher_percentage,
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleCancel = () => {
        formik.resetForm();
        setCurrentVoucher(null);
        setIsEditing(false);
        setShowModal(false);
    };

    const openModal = () => {
        formik.resetForm();
        setCurrentVoucher(null);
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
                    <Typography variant="h4" component="h2" sx={styles.headerText}>Manage Vouchers</Typography>
                    <Button variant="contained" color="primary" onClick={openModal}>Add New Voucher</Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={styles.table}>
                        <TableHead sx={styles.tableHead}>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Code</TableCell>
                                <TableCell>Percentage</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vouchers.map((voucher) => (
                                <TableRow key={voucher.voucher_id}>
                                    <TableCell>{voucher.voucher_id}</TableCell>
                                    <TableCell>{voucher.voucher_code}</TableCell>
                                    <TableCell>{`${voucher.voucher_percentage * 100}%`}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEdit(voucher)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(voucher.voucher_id)}>
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
                        {isEditing ? 'Update Voucher' : 'Add Voucher'}
                    </Typography>
                    <DialogContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="voucher_code"
                                        label="Voucher Code"
                                        name="voucher_code"
                                        value={formik.values.voucher_code}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.voucher_code && Boolean(formik.errors.voucher_code)}
                                        helperText={formik.touched.voucher_code && formik.errors.voucher_code}
                                        size="small"
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="voucher_percentage"
                                        label="Voucher Percentage"
                                        name="voucher_percentage"
                                        type="number"
                                        value={formik.values.voucher_percentage}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.voucher_percentage && Boolean(formik.errors.voucher_percentage)}
                                        helperText={formik.touched.voucher_percentage && formik.errors.voucher_percentage}
                                        size="small"
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                            </Grid>
                            <DialogActions sx={styles.dialogActions}>
                                <Button onClick={handleCancel} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    {isEditing ? 'Update' : 'Add'} Voucher
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
}

export default ManageVouchers;
