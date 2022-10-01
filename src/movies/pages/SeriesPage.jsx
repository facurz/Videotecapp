import { Container, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSeries } from '../../store/slices/movies/moviesSlice';
import {
    startGetSeriesByGenre,
    startSearchSeriesByKeyword,
} from '../../store/slices/movies/thunks';
import { MoviesList } from '../components/MoviesList';
import { Searcher } from '../components/Searcher';

export const SeriesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { genresSeries, series, favorites, favoritesId } = useSelector(
        state => state.movies
    );

    //Show recommended series
    useEffect(() => {
        dispatch(setSeries({ series }));
    }, [favorites]);

    //Event search by name
    const handlerSubmit = e => {
        e.preventDefault();
        const keyword = e.target.keyword.value.trim();
        console.log(keyword);

        if (keyword.length < 0) {
            Swal.fire('Escribir una palabra clave');
        } else {
            dispatch(startSearchSeriesByKeyword(keyword));
            navigate(`/series?keyword=${keyword}`);
        }
    };

    //Event select genre
    const handlerSelectGenre = genreId => {
        dispatch(startGetSeriesByGenre(genreId));
    };

    return (
         <Container>
            <Divider sx={{mt: 2, mb:2}} />
            <Searcher
                genres={genresSeries}
                onSubmit={handlerSubmit}
                onSelectGenre={handlerSelectGenre}
            />
            <Divider sx={{mt: 2, mb:2}} />
            <h1>Series</h1>
            <MoviesList movies={series} favoritesId={favoritesId} />
        </Container>
    );
};
