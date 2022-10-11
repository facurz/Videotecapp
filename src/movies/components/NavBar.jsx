import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { startLogout } from '../../store/slices/auth/thunks';
import { Searcher } from './Searcher';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Button,
    Container,
    Paper,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import logo from '../../assets/claqueta_movies.png';
import { logout } from '../../store/slices/auth/authSlice';

const pages = [
    { name: 'Películas', link: '/' },
    { name: 'Series', link: '/series' },
    { name: 'Favoritos', link: '/favorites' },
];

export const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout());
    };

    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar component='nav' position='static'>
            <Container>
                <Toolbar disableGutters>
                    <Box
                        width={57}
                        height={50}
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    >
                        <img
                            width={57}
                            height={50}
                            src={logo}
                            alt='logo'
                        />
                    </Box>

                    <Typography
                        variant='h5'
                        noWrap
                        component='h2'
                        color='primary'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Days One, sans-serif',
                            color: '#fff',
                            textShadow: '4px 3px 4px rgba(106,165,220,0.6)',
                        }}
                    >
                        VIDEOTECAPP
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon color='primary' />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(page => (
                                <Paper elevation={5} key={page.name}>
                                    <Button
                                        variant='contained'
                                        onClick={handleCloseNavMenu}
                                        component={RouterLink}
                                        to={page.link}
                                        sx={{
                                            fontSize: 12,
                                            width: 120,
                                            mb: 0.5,
                                        }}
                                    >
                                        {page.name}
                                    </Button>
                                </Paper>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        width={57}
                        height={50}
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                    >
                        <img
                            width={57}
                            height={50}
                            src={logout}
                            alt='logo'
                        />
                    </Box>
                    <Typography
                        variant='h5'
                        noWrap
                        component='h2'
                        color='primary'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Days One, sans-serif',
                            color: '#fff',
                            textShadow: '4px 3px 4px rgba(106,165,220,0.6)',
                        }}
                    >
                        VIDEOTECAPP
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: 'none',
                                md: 'flex',
                            },
                            justifyContent: 'start',
                            alignItems: 'center',
                        }}
                    >
                        {pages.map(page => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    color: 'white',
                                    display: 'block',
                                }}
                                component={RouterLink}
                                to={page.link}
                            >
                                {page.name}
                            </Button>
                        ))}
                        <Searcher />
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button variant='outlined' onClick={onLogout}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
