import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setGenreId,
    setGenreName,
    setMovies,
    setMoviesPage,
} from '../../store/slices/movies/moviesSlice';
import { MoviesList } from '../components/MoviesList';
import { Pagination } from '../components/Pagination';
import { Button, CardHeader, Container, Divider, IconButton } from '@mui/material';
import { setMenuOpen } from '../../store/slices/ui/uiSlice';
import { GenreMenu } from '../components/GenreMenu';
import { ArrowCircleUpTwoTone, ExpandMore } from '@mui/icons-material';
import { CheckingAuth } from '../../auth/components/CheckingAuth';

export const MoviesPage = () => {
    const dispatch = useDispatch();
    const {
        moviesPage,
        movies,
        favorites,
        favoritesId,
        genreName,
        genresMovies,
        isLoading,
        totalPages,
    } = useSelector(state => state.movies);

    const pageTitle = 'PELÍCULAS';

    //Set pagination to 1
    useEffect(() => {
        dispatch(setMoviesPage(1));
    }, []);

    //Update movies when favorites change
    useEffect(() => {
        dispatch(setMovies({ movies }));
    }, [favorites]);

    //Events handle pagination
    const prevPage = () => {
        dispatch(setMoviesPage(moviesPage - 1));
    };

    const nextPage = () => {
        dispatch(setMoviesPage(moviesPage + 1));
    };

    //Event genreMenu
    const handleMenu = (genreId, genreName) => {
        dispatch(setGenreId(genreId));
        dispatch(setGenreName(genreName));
        dispatch(setMoviesPage(1));
        dispatch(setMenuOpen(false));
    };
    return (
        <Container sx={{ position: 'relative' }}>
            <Divider  textAlign='left'>
                <CardHeader
                    title={
                        <Button
                            onClick={() => dispatch(setMenuOpen(true))}
                            endIcon={<ExpandMore />}
                        >
                            {pageTitle}
                        </Button>
                    }
                    titleTypographyProps={{ fontSize: 20 }}
                    subheader={`" ${genreName} "`}
                />
            </Divider>
            <GenreMenu genresList={genresMovies} handleMenu={handleMenu} />
            {isLoading ? (
                <CheckingAuth />
            ) : (
                <>
                    <Pagination
                        page={moviesPage}
                        nextPage={nextPage}
                        prevPage={prevPage}
                        totalPages={totalPages}
                    />
                    <MoviesList movies={movies} favoritesId={favoritesId} />
                    <IconButton component='a' href='#top' aria-label='ArrowCircleUpTwoTone'  sx={{position: 'fixed', bottom: 5 , right: 'calc(50vw - 25px)'}}>
                        <ArrowCircleUpTwoTone color='primary' sx={{fontSize: 50}}/>
                    </IconButton>
                </>
            )}
        </Container>
    );
};
