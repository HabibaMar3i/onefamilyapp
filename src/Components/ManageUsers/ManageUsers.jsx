import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {
    Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Typography, IconButton, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Container, Tooltip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './ManageUsers.css';

const validationSchema = Yup.object().shape({
    first_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("First name is required"),
    last_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Last name is required"),
    email: Yup.string().email("Invalid email address").nullable(),
    password: Yup.string().min(6, "Password too short").nullable(),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').nullable(),
    phone_number: Yup.string().required("Phone number is required"),
    date_of_birth: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    nat_id: Yup.string().required("National ID is required"),
    marital_status: Yup.string().required("Marital status is required"),
    role: Yup.string().required("Role is required"),
    experience_years: Yup.string().nullable(),
    medical_profession: Yup.string().nullable(),
    clinic_address: Yup.string().nullable(),
    number_of_children: Yup.number().nullable(),
    image: Yup.mixed().nullable()
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
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        backgroundColor: '#f0f4f8',
        padding: '1rem',
        borderRadius: '10px'
    },
    headerText: { fontWeight: 'bold', color: '#174A90' },
    table: { minWidth: 650 },
    tableHead: { backgroundColor: '#b0e0e6' },
    modalContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        maxHeight: '80vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    },
    formControl: { marginBottom: '1rem' },
    uploadButton: {
        borderRadius: '50px',
        backgroundColor: '#1E90FF',
        color: '#fff',
        padding: '10px 30px',
        '&:hover': {
            backgroundColor: '#1C86EE',
        },
    },
    dialogActions: { display: 'flex', justifyContent: 'center', marginTop: '1rem' },
    buttonContainer: { display: 'flex', alignItems: 'center' }
};

function ManageUsers() {
    const [msg, setMsg] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [filterRole, setFilterRole] = useState('admin');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setFilteredUsers(
            filterRole ? users.filter(user => user.role === filterRole) : users
        );
    }, [filterRole, users]);

    async function fetchUsers() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/Admin/Allparents');
            setUsers(response.data.users);
        } catch (error) {
            setMsg('Failed to load users');
        }
    }

    async function addUser(values, { setSubmitting }) {
        try {
            let formData = new FormData();
            Object.keys(values).forEach(key => {
                formData.append(key, values[key]);
            });

            const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                fetchUsers();
                toast.success('User added successfully', {
                    duration: 1000,
                    position: 'top-center'
                });
                formik.resetForm();
                setShowModal(false);
            } else {
                toast.error(response.data.message, {
                    duration: 1000,
                    position: 'top-center'
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add user', {
                duration: 1000,
                position: 'top-center'
            });
        } finally {
            setSubmitting(false);
        }
    }

    async function updateUser(userId, values, { setSubmitting }) {
        try {
            let formData = new FormData();
            formData.append('_method', 'put');
            Object.keys(values).forEach(key => {
                formData.append(key, values[key]);
            });

            const response = await axios.post(`http://127.0.0.1:8000/api/Admin/updateUser?user_id=${userId}&_method=put`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                fetchUsers();
                toast.success('User updated successfully', {
                    duration: 1000,
                    position: 'top-center'
                });
                setCurrentUser(null);
                formik.resetForm();
                setShowModal(false);
            } else {
                toast.error(response.data.message, {
                    duration: 1000,
                    position: 'top-center'
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update user', {
                duration: 1000,
                position: 'top-center'
            });
        } finally {
            setSubmitting(false);
        }
    }

    async function deleteUser(userId) {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/Admin/deleteUser?user_id=${userId}`);
            fetchUsers();
            toast.success('User deleted successfully');
        } catch (error) {
            toast.error('Failed to delete user');
        }
    }

    const handleEdit = (user) => {
        setCurrentUser(user);
        formik.setValues({
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone_number,
            date_of_birth: user.date_of_birth,
            gender: user.gender,
            address: user.address,
            nat_id: user.nat_id,
            marital_status: user.marital_status,
            role: user.role === 'parent' ? 'parent' : user.role,
            experience_years: user.experience_years || '',
            medical_profession: user.medical_profession || '',
            clinic_address: user.clinic_address || '',
            image: null
        });
        setShowModal(true);
    };

    const formik = useFormik({
        initialValues: {
            first_name: '', last_name: '', email: '', password: '', password_confirmation: '', phone_number: '', date_of_birth: '', gender: '', address: '', nat_id: '', marital_status: '', role: 'admin',
            experience_years: '', medical_profession: '', clinic_address: '', image: null
        },
        validationSchema,
        validate: (values) => {
            const errors = {};
            if (values.role === 'doctor') {
                if (!values.experience_years) {
                    errors.experience_years = 'Experience years are required';
                }
                if (!values.medical_profession) {
                    errors.medical_profession = 'Medical profession is required';
                }
                if (!values.clinic_address) {
                    errors.clinic_address = 'Clinic address is required';
                }
            }
            return errors;
        },
        onSubmit: currentUser ? (values, actions) => updateUser(currentUser.user_id, values, actions) : addUser
    });

    const renderShortenedText = (text, maxLength = 15) => (
        <Tooltip title={text}>
            <span>{text.length > maxLength ? `${text.substring(0, maxLength)}...` : text}</span>
        </Tooltip>
    );

    return (
        <ThemeProvider theme={theme}>
            <Container sx={styles.container}>
                <Toaster />
                <Box sx={styles.header}>
                    <Typography variant="h4" component="h2" sx={styles.headerText}>Manage Users</Typography>
                    <Box sx={styles.buttonContainer}>
                        <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>Add User</Button>
                        <TextField
                            select
                            label="Filter by Role"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            sx={{ ml: 2, minWidth: 150 }}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="doctor">Doctor</MenuItem>
                            <MenuItem value="parent">Parent</MenuItem>
                        </TextField>
                    </Box>
                </Box>
                {msg && <Typography color="error" sx={{ mb: 2 }}>{msg}</Typography>}
                <TableContainer component={Paper}>
                    <Table sx={styles.table}>
                        <TableHead sx={styles.tableHead}>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Birth Date</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>National ID</TableCell>
                                <TableCell>Marital Status</TableCell>
                                <TableCell>Role</TableCell>
                                {filterRole === 'doctor' && (
                                    <>
                                        <TableCell>Exp. Years</TableCell>
                                        <TableCell>Med. Prof.</TableCell>
                                        <TableCell>Clinic Addr.</TableCell>
                                    </>
                                )}
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                                <TableRow key={user.user_id}>
                                    <TableCell>
                                        <img src={`http://127.0.0.1:8000/storage/${user.image}`} alt={user.first_name} className="user-img" />
                                    </TableCell>
                                    <TableCell>{user.first_name} {user.last_name}</TableCell>
                                    <TableCell>{renderShortenedText(user.email)}</TableCell>
                                    <TableCell>{user.phone_number}</TableCell>
                                    <TableCell>{user.date_of_birth}</TableCell>
                                    <TableCell>{user.gender}</TableCell>
                                    <TableCell>{renderShortenedText(user.address)}</TableCell>
                                    <TableCell>{renderShortenedText(user.nat_id)}</TableCell>
                                    <TableCell>{user.marital_status}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    {user.role === 'doctor' && (
                                        <>
                                            <TableCell>{user.experience_years}</TableCell>
                                            <TableCell>{user.medical_profession}</TableCell>
                                            <TableCell>{renderShortenedText(user.clinic_address)}</TableCell>
                                        </>
                                    )}
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEdit(user)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => deleteUser(user.user_id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={filterRole === 'doctor' ? 13 : 11} align="center">No users found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={showModal} onClose={() => setShowModal(false)}>
                    <DialogTitle sx={{ textAlign: 'center', marginBottom: '1rem', color: 'primary.main' }}>
                        {currentUser ? 'Update User' : 'Add User'}
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={formik.handleSubmit} className="manage-users-form">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        id="first_name"
                                        name="first_name"
                                        label="First Name"
                                        value={formik.values.first_name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                        helperText={formik.touched.first_name && formik.errors.first_name}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        id="last_name"
                                        name="last_name"
                                        label="Last Name"
                                        value={formik.values.last_name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                        helperText={formik.touched.last_name && formik.errors.last_name}
                                        size="small"
                                    />
                                </Grid>
                                {!currentUser && (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="email"
                                                name="email"
                                                label="Email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="password"
                                                name="password"
                                                label="Password"
                                                type="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                helperText={formik.touched.password && formik.errors.password}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                label="Password Confirmation"
                                                type="password"
                                                value={formik.values.password_confirmation}
                                                onChange={formik.handleChange}
                                                error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                                                helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
                                                size="small"
                                            />
                                        </Grid>
                                    </>
                                )}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        id="phone_number"
                                        name="phone_number"
                                        label="Phone Number"
                                        value={formik.values.phone_number}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                        helperText={formik.touched.phone_number && formik.errors.phone_number}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        label="Birth Date"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={formik.values.date_of_birth}
                                        onChange={formik.handleChange}
                                        error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
                                        helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        id="gender"
                                        name="gender"
                                        label="Gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                        helperText={formik.touched.gender && formik.errors.gender}
                                        size="small"
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        id="address"
                                        name="address"
                                        label="Address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        id="nat_id"
                                        name="nat_id"
                                        label="National ID"
                                        value={formik.values.nat_id}
                                        onChange={formik.handleChange}
                                        error={formik.touched.nat_id && Boolean(formik.errors.nat_id)}
                                        helperText={formik.touched.nat_id && formik.errors.nat_id}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        id="marital_status"
                                        name="marital_status"
                                        label="Marital Status"
                                        value={formik.values.marital_status}
                                        onChange={formik.handleChange}
                                        error={formik.touched.marital_status && Boolean(formik.errors.marital_status)}
                                        helperText={formik.touched.marital_status && formik.errors.marital_status}
                                        size="small"
                                    >
                                        <MenuItem value="single">Single</MenuItem>
                                        <MenuItem value="married">Married</MenuItem>
                                        <MenuItem value="widowed">Widowed</MenuItem>
                                        <MenuItem value="divorced">Divorced</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        id="role"
                                        name="role"
                                        label="Role"
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                        error={formik.touched.role && Boolean(formik.errors.role)}
                                        helperText={formik.touched.role && formik.errors.role}
                                        size="small"
                                        disabled={currentUser && currentUser.role === 'parent'}
                                    >
                                        <MenuItem value="admin">Admin</MenuItem>
                                        <MenuItem value="doctor">Doctor</MenuItem>
                                        {currentUser && currentUser.role === 'parent' && <MenuItem value="parent">Parent</MenuItem>}
                                    </TextField>
                                </Grid>
                                {formik.values.role === 'doctor' && (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="experience_years"
                                                name="experience_years"
                                                label="Exp. Years"
                                                value={formik.values.experience_years}
                                                onChange={formik.handleChange}
                                                error={formik.touched.experience_years && Boolean(formik.errors.experience_years)}
                                                helperText={formik.touched.experience_years && formik.errors.experience_years}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="medical_profession"
                                                name="medical_profession"
                                                label="Med. Prof."
                                                value={formik.values.medical_profession}
                                                onChange={formik.handleChange}
                                                error={formik.touched.medical_profession && Boolean(formik.errors.medical_profession)}
                                                helperText={formik.touched.medical_profession && formik.errors.medical_profession}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="clinic_address"
                                                name="clinic_address"
                                                label="Clinic Addr."
                                                value={formik.values.clinic_address}
                                                onChange={formik.handleChange}
                                                error={formik.touched.clinic_address && Boolean(formik.errors.clinic_address)}
                                                helperText={formik.touched.clinic_address && formik.errors.clinic_address}
                                                size="small"
                                            />
                                        </Grid>
                                    </>
                                )}
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
                                                formik.setFieldValue("image", event.currentTarget.files[0]);
                                            }}
                                        />
                                    </Button>
                                    {formik.touched.image && formik.errors.image && (
                                        <Typography color="error" variant="body2">{formik.errors.image}</Typography>
                                    )}
                                </Grid>
                            </Grid>
                            <DialogActions sx={styles.dialogActions}>
                                <Button onClick={() => setShowModal(false)} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    {currentUser ? 'Update User' : 'Add User'}
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
}

export default ManageUsers;
