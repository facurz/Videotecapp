import { useDispatch, useSelector } from 'react-redux';
import {
    setGenreId,
    setGenreName,
    setMoviesPage,
} from '../../store/slices/movies/moviesSlice';
import { setMenuOpen } from '../../store/slices/ui/uiSlice';
import { Box, Button, Grid, Paper } from '@mui/material';
import './genreMenu.css';

export const GenreMenu = ({ genresList, handleMenu }) => {
    const dispatch = useDispatch();

    const { menuOpen } = useSelector(state => state.ui);

    return (
        <Box
            className={'genresMenu ' + (menuOpen && 'active')}
            onClick={() => {
                dispatch(setMenuOpen(false));
            }}
        >
            <Grid
                container
                width={300}
                spacing={0.5}
                sx={{ position: 'absolute', top: 70 }}
            >
                {genresList.map(genre => (
                    <Grid item key={genre.id} xs={12} textAlign='center'>
                        <Paper elevation={5}>
                            <Button
                                variant='contained'
                                onClick={() => handleMenu(genre.id, genre.name)}
                                sx={{ fontSize: 12, width: '100%' }}
                            >
                                {genre.name}
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
