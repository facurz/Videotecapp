import { Box, Stack, Typography } from '@mui/material';

export const AuthLayout = ({ children }) => {
    return (
        <Stack
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh', backgroundColor: 'primary', padding: 4 }}
        >
            <Stack
                direction='column'
                alignItems='center'
                justifyContent='center'
            >
                <Typography
                className='animate__animated animate__flash'
                    variant='h4'
                    noWrap
                    component='h2'
                    sx={{
                        fontFamily: 'Days One, sans-serif',
                        color: '#fff',
                        textShadow: '4px 3px 4px rgba(106,165,220,0.6)',
                    }}
                >
                    VideotecApp
                </Typography>
            </Stack>
            <Stack
                className='layout__background'
                alignItems='center'
                justifyContent='end'
                sx={{
                    borderRadius: 2,
                    pb: 1,
                    width: {md:400, xs:390},
                    height: {md:349, xs: 339},
                }}
            >
                {children}
            </Stack>
        </Stack>
    );
};
