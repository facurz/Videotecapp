import { Link as RouterLink } from 'react-router-dom';

import { AuthLayout } from '../layout/AuthLayout';

import { Button, Grid, Link, Stack, TextField, Typography } from '@mui/material';
import { useForm } from '../../hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startCreatingUserWithEmail } from '../../store/slices/auth/thunks';

const formData = {
    email: '',
    password: '',
    displayName: '',
};

const formValidations = {
    email: [
        [value => value.includes('@'), 'El correo debe tener un @'],
        [
            value =>
                value.match(
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
                ),
            'El correo debe tener un formato valido',
        ],
    ],
    password: [
        [
            value => value.length >= 6,
            'El password debe tener al menos 6 caracteres',
        ],
    ],
    displayName: [
        [value => value.length >= 1, 'El nombre es obligatorio'],
        [value => value.length >= 6, 'El nombre debe tener al menos 6 letras'],
    ],
};

export const RegisterPage = () => {
    const dispatch = useDispatch();

    const [formSubmited, setFormSubmited] = useState(false);

    const {
        formState,
        displayName,
        email,
        password,
        onInputChange,
        isFormValid,
        displayNameValid,
        passwordValid,
        emailValid,
    } = useForm(formData, formValidations);

    const onSubmit = event => {
        event.preventDefault();
        setFormSubmited(true);
        if (!isFormValid) return;

        dispatch(startCreatingUserWithEmail(formState));
    };

    return (
        <AuthLayout title='Crear cuenta'>
            <form
                onSubmit={onSubmit}
                className='animate__animated animate__fadeIn'
            >
                <Stack sx={{ width: {md:300, sm: 200}}}>
                    <TextField
                        type='text'
                        size='small'
                        variant='standard'
                        placeholder='Nombre de Usuario'
                        fullWidth
                        name='displayName'
                        value={displayName}
                        onChange={onInputChange}
                        error={!!displayNameValid && formSubmited}
                        helperText={formSubmited && displayNameValid}
                    />
                </Stack>
                <Stack sx={{ mt: 2 }}>
                    <TextField
                        type='email'
                        size='small'
                        variant='standard'
                        placeholder='correo@gmail.com'
                        fullWidth
                        name='email'
                        value={email}
                        onChange={onInputChange}
                        error={!!emailValid && formSubmited}
                        helperText={formSubmited && emailValid}
                    />
                </Stack>
                <Stack sx={{ mt: 2 }}>
                    <TextField
                        type='password'
                        size='small'
                        variant='standard'
                        placeholder='Contraseña'
                        fullWidth
                        name='password'
                        value={password}
                        onChange={onInputChange}
                        error={!!passwordValid && formSubmited}
                        helperText={formSubmited && passwordValid}
                    />
                </Stack>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <Button
                            variant='text'
                            fullWidth
                            type='submit'
                            disabled={!isFormValid && formSubmited}
                        >
                            <Typography sx={{color:'#fff' }}>Crear cuenta</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction='row' justifyContent='center'>
                    <Link
                        component={RouterLink}
                        color='inherit'
                        to='/auth/login'
                    >
                        Ya tengo una cuenta
                    </Link>
                </Grid>
            </form>
        </AuthLayout>
    );
};
