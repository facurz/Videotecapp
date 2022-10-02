import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMovies } from '../../store/slices/movies/moviesSlice';
import {
    startGetMoviesByGenre,
    startSearchMoviesByKeyword,
} from '../../store/slices/movies/thunks';
import Swal from 'sweetalert2';
import { MoviesList } from '../components/MoviesList';
import { Searcher } from '../components/Searcher';
import { Container, Divider, Typography } from '@mui/material';

export const MoviesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { genresMovies, movies, favorites, favoritesId } = useSelector(
        state => state.movies
    );

    const pageTitle = 'PELÍCULAS';

    //Show recommended movies
    useEffect(() => {
        dispatch(setMovies({ movies }));
    }, [favorites]);

    //Event search by name
    const handlerSubmit = (e) => {
        e.preventDefault();
        const keyword = e.target.keyword.value.trim();

        if (!keyword) {
            Swal.fire({
                text: 'Debes escribir algo',
                icon: 'question',
                confirmButtonText: 'OK',
            });
        } else {
            dispatch(startSearchMoviesByKeyword(keyword));
            navigate(`/?keyword=${keyword}`);
        }
    };

    //Event select genre
    const handlerSelectGenre = genreId => {
        dispatch(startGetMoviesByGenre(genreId));
    };

    return (
        <Container>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Searcher
                genres={genresMovies}
                onSubmit={handlerSubmit}
                onSelectGenre={handlerSelectGenre}
                pageTitle={pageTitle}
            />
            
            <MoviesList movies={movies} favoritesId={favoritesId}/>
        </Container>
    );
};
