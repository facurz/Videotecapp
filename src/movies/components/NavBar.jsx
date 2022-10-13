import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { Logout, Menu as MenuIcon } from '@mui/icons-material';
import { setMenuOpen } from '../../store/slices/ui/uiSlice';

const pages = [
    { name: 'Películas', link: '/' },
    { name: 'Series', link: '/series' },
    { name: 'Favoritos', link: '/favorites' },
];

export const NavBar = () => {
    const { displayName, menuOpen } = useSelector(state => state.auth);
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
        dispatch(setMenuOpen(false))
        
    };

    return (
        <AppBar component='nav' position='static' id='top'>
            <Container>
                <Toolbar disableGutters>

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
                                        fullWidth
                                        sx={{
                                            fontSize: 12,
                                            mb: 0.5,
                                        }}
                                    >
                                        {page.name}
                                    </Button>
                                </Paper>
                            ))}
                            <Searcher handleCloseNavMenu={handleCloseNavMenu}/>
                        </Menu>
                        
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
                            justifyContent: 'center',
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
                        <Searcher handleCloseNavMenu={handleCloseNavMenu} />
                    </Box>

                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                        <Typography variant='body1' sx={{display:{xs:'none', md:'flex'}}}>{displayName}</Typography>
                        <IconButton onClick={onLogout} aria-label='logout'>
                            <Logout color='primary'/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
