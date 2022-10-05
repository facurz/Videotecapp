import { useState } from 'react';
import { Menu, Search } from '@mui/icons-material';
import {
    Paper,
    Button,
    Grid,
    Box,
    TextField,
    IconButton,
    Divider,
    CardHeader,
} from '@mui/material';
import './searcher.css'

export const Searcher = ({ genres, onSubmit, onSelectGenre, pageTitle }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [genreSelected, setGenreSelected] = useState('Todas');
    
    return (
        <>
            <form
                onSubmit={e => {
                    onSubmit(e);
                    setGenreSelected(e.target.keyword.value.trim() || genreSelected);
                }}
                className='d-flex'
            >
                <TextField
                    id='outlined-size-small'
                    size='small'
                    type='text'
                    name='keyword'
                    autoComplete='off'
                    focused
                    placeholder='Quiero buscar...'
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                type='submit'
                                position='end'
                                sx={{ p: '10px' }}
                                aria-label='search'
                            >
                                <Search />
                            </IconButton>
                        ),
                    }}
                />
                <Button
                    variant='outlined'
                    sx={{ ml: 1 }}
                    onClick={() => setMenuOpen(!menuOpen)}
                    endIcon={<Menu />}
                >
                    Categorías
                </Button>
            </form>

            <Box className={'genresMenu ' + (menuOpen && 'active')}>
                <Grid container spacing={0.5}>
                    {genres.map(genre => (
                        <Grid item key={genre.id} xs={12} textAlign='center'>
                            <Paper elevation={5}>
                                <Button
                                    variant='contained'
                                    onClick={() => {
                                        onSelectGenre(`${genre.id}`);
                                        setGenreSelected(`${genre.name}`);
                                        setMenuOpen(!menuOpen);
                                    }}
                                    sx={{ fontSize: 12, width: '100%' }}
                                >
                                    {genre.name}
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Divider textAlign='left'>
                <CardHeader
                    title={`${pageTitle}`}
                    titleTypographyProps={{ fontSize: 20 }}
                    subheader={`"${genreSelected}"`}
                />
            </Divider>
        </>
    );
};
