import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setMovies,
    setMoviesPage,
    setSearchActive,
    setSearchPage,
} from '../../store/slices/movies/moviesSlice';
import {
    startGetMoviesByGenre,
    startSearchMoviesByKeyword,
} from '../../store/slices/movies/thunks';
import Swal from 'sweetalert2';
import { MoviesList } from '../components/MoviesList';
import { Searcher } from '../components/Searcher';
import { Pagination } from '../components/Pagination';
import { Container, Divider } from '@mui/material';

export const MoviesPage = () => {
    const dispatch = useDispatch();
    const [keywordSearched, setKeywordSearched] = useState(null);
   

    const {
        searchActive,
        searchPage,
        moviesPage,
        genresMovies,
        movies,
        favorites,
        favoritesId,
    } = useSelector(state => state.movies);

    const pageTitle = 'PELÍCULAS';

    //Show recommended movies
    useEffect(() => {
        dispatch(setMovies({ movies }));
    }, [favorites]);

    useEffect(() => {
        dispatch(setMoviesPage(1));
    }, []);

    //Event search by name
    const handlerSubmit = e => {
        e.preventDefault();
        const keyword = e.target.keyword.value.trim();
        

        if (!keyword) {
            Swal.fire({
                text: 'Debes escribir algo',
                icon: 'question',
                confirmButtonText: 'OK',
            });
        } else {
            setKeywordSearched(keyword);
            dispatch(setSearchActive(true));
            dispatch(startSearchMoviesByKeyword(keyword, searchPage));
            navigate(`/?query=${keyword}&page=${searchPage}`);
        }
    };

    //Event select genre
    const handlerSelectGenre = genreId => {
        dispatch(startGetMoviesByGenre(genreId));
        dispatch(setMoviesPage(1));
    };

    //Events handle pagination
    const prevPage =  () => {
        if (searchActive) {
            dispatch(setSearchPage(searchPage - 1));
            dispatch(startSearchMoviesByKeyword(keywordSearched, searchPage));
        }else{dispatch(setMoviesPage(moviesPage - 1));}
        
    };

    const nextPage = () => {
        if (searchActive) {
            dispatch(setSearchPage(searchPage + 1));
            dispatch(startSearchMoviesByKeyword(keywordSearched, searchPage));
        }else{dispatch(setMoviesPage(moviesPage + 1));}
        
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
            <Pagination
                page={searchActive ? searchPage : moviesPage}
                nextPage={nextPage}
                prevPage={prevPage}
            />
            <MoviesList movies={movies} favoritesId={favoritesId} />
        </Container>
    );
};
