import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AuthLayout } from '../layout/AuthLayout';

import { Button, Grid, Link, Stack, TextField, Typography } from '@mui/material';

import { Google, StackedBarChartSharp } from '@mui/icons-material';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
    startGoogleSignIn,
    startLoginWithEmailPassword,
} from '../../store/slices/auth/thunks';

const initialForm = {
    email: '',
    password: '',
};

export const LoginPage = () => {
    const dispatch = useDispatch();

    const { status } = useSelector(state => state.auth);

    const isChecking = useMemo(() => status === 'checking', [status]);

    const { email, password, onInputChange } = useForm(initialForm);

    const onSubmit = event => {
        event.preventDefault();
        console.log({ email, password });
        dispatch(startLoginWithEmailPassword({ email, password }));
    };

    const onGoogleSignIn = () => {
        console.log('onGoogleSignIn');

        dispatch(startGoogleSignIn());
    };

    return (
        <AuthLayout>
            <form
                onSubmit={onSubmit}
                className='animate__animated animate__fadeIn'
            >
                <Stack sx={{  width: {md:300, sm: 200}}}>
                    <TextField
                        type='email'
                        placeholder='correo@gmail.com'
                        fullWidth
                        size='small'
                        variant='standard'
                        name='email'
                        value={email}
                        onChange={onInputChange}
                    />
                </Stack>
                <Stack sx={{ mt: 1 }}>
                    <TextField
                        type='password'
                        placeholder='Contraseña'
                        fullWidth
                        size='small'
                        variant='standard'
                        name='password'
                        value={password}
                        onChange={onInputChange}
                        sx={{ mt: 2 }}
                    />
                </Stack>
                <Grid container spacing={1} sx={{ mb: 2, mt: 1 }}>
                    <Grid item xs={6} sx={{ mt: 1 }}>
                        <Button
                            variant='text'
                            fullWidth
                            type='submit'
                            disabled={isChecking}
                        >
                            <Typography sx={{ ml: 1, color:'#fff' }}>Login</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={6} sx={{ mt: 1 }}>
                        <Button
                            variant='text'
                            fullWidth
                            onClick={onGoogleSignIn}
                            disabled={isChecking}
                        >
                            <Google sx={{color:'#fff'}} />
                            <Typography sx={{ ml: 1, color:'#fff' }}>Google</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction='row' justifyContent='end'>
                    <Link
                        component={RouterLink}
                        
                        to='/auth/register'
                        color='inherit'
                    >
                        Crear una cuenta
                    </Link>
                </Grid>
            </form>
        </AuthLayout>
    );
};
