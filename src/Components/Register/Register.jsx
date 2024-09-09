import React, { useState, useEffect } from 'react';
import { useFormik, Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    MenuItem,
    IconButton,
    Paper,
    InputLabel,
    Select,
    FormControl,
    FormHelperText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Register.css';

const validationSchema = Yup.object({
    first_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("First name is required"),
    last_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Too Short").max(14, "Too Long!").required("Password is required"),
    password_confirmation: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match").required("Confirmation password is required"),
    phone_number: Yup.string().required("Phone number is required"),
    date_of_birth: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    nat_id: Yup.string().required("National ID is required"),
    marital_status: Yup.string().required("Marital status is required"),
    children: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Child name is required'),
            date_of_birth: Yup.date().required('Child date of birth is required'),
            gender: Yup.string().required('Child gender is required'),
        })
    ),
    image: Yup.mixed().nullable()
});

function Register() {
    const [parents, setParents] = useState([]);
    const [imageName, setImageName] = useState('');

    async function registerParent(values, { setSubmitting, resetForm }) {
        try {
            let formData = new FormData();
            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('password_confirmation', values.password_confirmation);
            formData.append('phone_number', values.phone_number);
            formData.append('date_of_birth', values.date_of_birth);
            formData.append('gender', values.gender);
            formData.append('address', values.address);
            formData.append('nat_id', values.nat_id);
            formData.append('marital_status', values.marital_status);
            formData.append('number_of_children', values.marital_status === 'single' ? 0 : values.number_of_children);
            formData.append('role', 'parent');

            if (values.image) {
                formData.append('image', values.image);
            }

            values.children.forEach((child) => {
                formData.append('children_names[]', child.name);
                formData.append('children_date_of_birth[]', child.date_of_birth);
                formData.append('children_genders[]', child.gender);
            });

            const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success('Registered successfully', {
                    duration: 1000,
                    position: 'top-center'
                });
                resetForm();
                setImageName('');
                window.location.href = '/login'; 

            } else {
                const errors = response.data.error;
                Object.keys(errors).forEach(key => {
                    errors[key].forEach(msg => {
                        toast.error(`${key}: ${msg}`);
                    });
                });
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Registration failed: ${error.response.data.message}`);
            } else {
                toast.error('Oops, Something went wrong..');
            }
        } finally {
            setSubmitting(false);
        }
    }

    const handleImageChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        setFieldValue('image', file);
        setImageName(file ? file.name : '');
    };

    const clearImage = (setFieldValue) => {
        setFieldValue('image', null);
        setImageName('');
    };

    return (
        <div className="register-container">
            <Container maxWidth="md">
                <Box mt={4} p={3}>
                    <h2 className="custom-heading">
                        Sign Up
                    </h2>
                    <Formik
                        initialValues={{
                            first_name: '', last_name: '', email: '', password: '', password_confirmation: '', phone_number: '', date_of_birth: '', gender: '', address: '', nat_id: '', marital_status: '', image: null, children: []
                        }}
                        validationSchema={validationSchema}
                        onSubmit={registerParent}
                    >
                        {({ values, errors, touched, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={1.5}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="first_name"
                                            name="first_name"
                                            label="First Name"
                                            value={values.first_name}
                                            onChange={handleChange}
                                            error={touched.first_name && Boolean(errors.first_name)}
                                            helperText={touched.first_name && errors.first_name}
                                            sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="last_name"
                                            name="last_name"
                                            label="Last Name"
                                            value={values.last_name}
                                            onChange={handleChange}
                                            error={touched.last_name && Boolean(errors.last_name)}
                                            helperText={touched.last_name && errors.last_name}
                                            sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="email"
                                            name="email"
                                            label="Email"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            label="Confirm Password"
                                            type="password"
                                            value={values.password_confirmation}
                                            onChange={handleChange}
                                            error={touched.password_confirmation && Boolean(errors.password_confirmation)}
                                            helperText={touched.password_confirmation && errors.password_confirmation}
                                            sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="phone_number"
                                            name="phone_number"
                                            label="Phone Number"
                                            value={values.phone_number}
                                            onChange={handleChange}
                                            error={touched.phone_number && Boolean(errors.phone_number)}
                                            helperText={touched.phone_number && errors.phone_number}
                                            sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="date_of_birth"
                                            name="date_of_birth"
                                            label="Date of Birth"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            value={values.date_of_birth}
                                            onChange={handleChange}
                                            error={touched.date_of_birth && Boolean(errors.date_of_birth)}
                                            helperText={touched.date_of_birth && errors.date_of_birth}
                                            sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth error={touched.gender && Boolean(errors.gender)} sx={{ bgcolor: '#fff', borderRadius: 2 }}>
                                            <InputLabel>Gender</InputLabel>
                                            <Select
                                                id="gender"
                                                name="gender"
                                                value={values.gender}
                                                onChange={handleChange}
                                                label="Gender"
                                            >
                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                            </Select>
                                            {touched.gender && errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="address"
                                            name="address"
                                            label="Address"
                                            value={values.address}
                                            onChange={handleChange}
                                            error={touched.address && Boolean(errors.address)}
                                            helperText={touched.address && errors.address}
                                            sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="nat_id"
                                            name="nat_id"
                                            label="National ID"
                                            value={values.nat_id}
                                            onChange={handleChange}
                                            error={touched.nat_id && Boolean(errors.nat_id)}
                                            helperText={touched.nat_id && errors.nat_id}
                                            sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={touched.marital_status && Boolean(errors.marital_status)} sx={{ bgcolor: '#fff', borderRadius: 2 }}>
                                            <InputLabel>Marital Status</InputLabel>
                                            <Select
                                                id="marital_status"
                                                name="marital_status"
                                                value={values.marital_status}
                                                onChange={handleChange}
                                                label="Marital Status"
                                            >
                                                <MenuItem value="single">Single</MenuItem>
                                                <MenuItem value="married">Married</MenuItem>
                                                <MenuItem value="widowed">Widowed</MenuItem>
                                                <MenuItem value="divorced">Divorced</MenuItem>
                                            </Select>
                                            {touched.marital_status && errors.marital_status && <FormHelperText>{errors.marital_status}</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container direction="row" alignItems="center" spacing={1}>
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    sx={{ bgcolor: '#D85207', '&:hover': { bgcolor: '#c64707' } }}
                                                >
                                                    Upload Image
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={(event) => handleImageChange(event, setFieldValue)}
                                                    />
                                                </Button>
                                            </Grid>
                                            {imageName && (
                                                <Grid item>
                                                    <Typography variant="body2" sx={{ mb: 0 }}>{imageName}</Typography>
                                                </Grid>
                                            )}
                                            {imageName && (
                                                <Grid item>
                                                    <IconButton onClick={() => clearImage(setFieldValue)} sx={{ color: '#D85207' }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>

                                    {values.marital_status !== 'single' && (
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="number_of_children"
                                                name="number_of_children"
                                                label="Number of Children"
                                                type="number"
                                                value={values.number_of_children}
                                                onChange={handleChange}
                                                onBlur={() => {
                                                    const numberOfChildren = parseInt(values.number_of_children);
                                                    if (numberOfChildren > values.children.length) {
                                                        for (let i = values.children.length; i < numberOfChildren; i++) {
                                                            values.children.push({ name: '', date_of_birth: '', gender: '' });
                                                        }
                                                    } else if (numberOfChildren < values.children.length) {
                                                        for (let i = values.children.length; i > numberOfChildren; i--) {
                                                            values.children.pop();
                                                        }
                                                    }
                                                    setFieldValue('children', values.children);
                                                }}
                                                error={touched.number_of_children && Boolean(errors.number_of_children)}
                                                helperText={touched.number_of_children && errors.number_of_children}
                                                sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                            />
                                        </Grid>
                                    )}
                                    {values.marital_status !== 'single' && (
                                        <Grid item xs={12}>
                                            <Typography variant="h6" sx={{ color: '#D85207', mb: 2 }}>Children Details</Typography>
                                            <FieldArray name="children">
                                                {({ remove }) => (
                                                    <div>
                                                        {values.children.map((_, index) => (
                                                            <Box key={index} mb={2}>
                                                                <Grid container spacing={2} alignItems="center">
                                                                    <Grid item xs={11} sm={4}>
                                                                        <TextField
                                                                            fullWidth
                                                                            id={`children[${index}].name`}
                                                                            name={`children[${index}].name`}
                                                                            label="Child Name"
                                                                            value={values.children[index].name}
                                                                            onChange={handleChange}
                                                                            error={touched.children && touched.children[index] && Boolean(errors.children && errors.children[index] && errors.children[index].name)}
                                                                            helperText={touched.children && touched.children[index] && errors.children && errors.children[index] && errors.children[index].name}
                                                                            sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={11} sm={4}>
                                                                        <TextField
                                                                            fullWidth
                                                                            id={`children[${index}].date_of_birth`}
                                                                            name={`children[${index}].date_of_birth`}
                                                                            label="Child Date of Birth"
                                                                            type="date"
                                                                            InputLabelProps={{ shrink: true }}
                                                                            value={values.children[index].date_of_birth}
                                                                            onChange={handleChange}
                                                                            error={touched.children && touched.children[index] && Boolean(errors.children && errors.children[index] && errors.children[index].date_of_birth)}
                                                                            helperText={touched.children && touched.children[index] && errors.children && errors.children[index] && errors.children[index].date_of_birth}
                                                                            sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={11} sm={3}>
                                                                        <FormControl fullWidth error={touched.children && touched.children[index] && Boolean(errors.children && errors.children[index] && errors.children[index].gender)} sx={{ bgcolor: '#fff', borderRadius: 2 }}>
                                                                            <InputLabel>Child Gender</InputLabel>
                                                                            <Select
                                                                                id={`children[${index}].gender`}
                                                                                name={`children[${index}].gender`}
                                                                                value={values.children[index].gender}
                                                                                onChange={handleChange}
                                                                                label="Child Gender"
                                                                            >
                                                                                <MenuItem value="">
                                                                                    <em>None</em>
                                                                                </MenuItem>
                                                                                <MenuItem value="male">Male</MenuItem>
                                                                                <MenuItem value="female">Female</MenuItem>
                                                                            </Select>
                                                                            {touched.children && touched.children[index] && errors.children && errors.children[index] && errors.children[index].gender && <FormHelperText>{errors.children[index].gender}</FormHelperText>}
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={1}>
                                                                        <IconButton onClick={() => remove(index)} sx={{ color: '#D85207' }}>
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        ))}
                                                        {values.children.length < values.number_of_children && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#D85207' }} onClick={() => values.children.length < values.number_of_children && values.children.push({ name: '', date_of_birth: '', gender: '' })}>
                                                                <AddCircleIcon /> <Typography sx={{ ml: 1 }}>Add Child</Typography>
                                                            </Box>
                                                        )}
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </Grid>
                                    )}
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <Button type="submit" variant="contained" sx={{ bgcolor: '#D85207', '&:hover': { bgcolor: '#c64707' }, mt: 2 }} disabled={isSubmitting}>
                                            Register
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Container>
        </div>
    );
}

export default Register;
