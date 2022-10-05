import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSeries, setSeriesPage } from '../../store/slices/movies/moviesSlice';
import {
    startGetSeriesByGenre,
    startSearchSeriesByKeyword,
} from '../../store/slices/movies/thunks';
import Swal from 'sweetalert2';
import { MoviesList } from '../components/MoviesList';
import { Searcher } from '../components/Searcher';
import { Container, Divider } from '@mui/material';
import { Pagination } from '../components/Pagination';

export const SeriesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { seriesPage, genresSeries, series, favorites, favoritesId } = useSelector(
        state => state.movies
    );

    const pageTitle = 'SERIES';

    //Show recommended series
    useEffect(() => {
        dispatch(setSeries({ series }));
    }, [favorites]);

    useEffect(() => {
        dispatch(setSeriesPage(1));
    }, []);


    //Event search by name
    const handlerSubmit = e => {
        e.preventDefault();
        const keyword = e.target.keyword.value.trim();
        console.log(keyword);

        if (!keyword) {
            Swal.fire({
                text: 'Debes escribir algo',
                icon: 'question',
                confirmButtonText: 'OK',
            });
        } else {
            dispatch(startSearchSeriesByKeyword(keyword));
            navigate(`/series?keyword=${keyword}`);
        }
    };

    //Event select genre
    const handlerSelectGenre = genreId => {
        dispatch(startGetSeriesByGenre(genreId));
    };

    //Events handle pagination
    const prevPage = () => {
        dispatch(setSeriesPage(seriesPage - 1));
    };

    const nextPage = () => {
        dispatch(setSeriesPage(seriesPage + 1));
    };

    return (
         <Container>
            <Divider sx={{mt: 2, mb:2}} />
            <Searcher
                genres={genresSeries}
                onSubmit={handlerSubmit}
                onSelectGenre={handlerSelectGenre}
                pageTitle={pageTitle}
            />
            <Pagination page={seriesPage} nextPage={nextPage} prevPage={prevPage}/>
            <MoviesList  movies={series} favoritesId={favoritesId}  />
        </Container>
    );
};
