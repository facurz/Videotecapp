import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setGenreIdSeries,
    setGenreNameSeries,
    setSeries,
    setSeriesPage,
} from '../../store/slices/movies/moviesSlice';
import { MoviesList } from '../components/MoviesList';
import { Pagination } from '../components/Pagination';
import { setMenuOpen } from '../../store/slices/ui/uiSlice';
import { GenreMenu } from '../components/GenreMenu';
import { Button, CardHeader, Container, Divider } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { CheckingAuth } from '../../auth/components/CheckingAuth';

export const SeriesPage = () => {
    const dispatch = useDispatch();
    const { seriesPage, series, favorites, favoritesId, genreNameSeries, genresSeries, isLoading } =
        useSelector(state => state.movies);

    const pageTitle = 'SERIES';
    


    //Set pagination to 1
    useEffect(() => {
        dispatch(setSeriesPage(1));
    }, []);

    //Update movies when favorites change
    useEffect(() => {
        dispatch(setSeries({  series }));
    }, [favorites]);

    //Events handle pagination
    const prevPage = () => {
        dispatch(setSeriesPage(seriesPage - 1));
    };

    const nextPage = () => {
        dispatch(setSeriesPage(seriesPage + 1));
    };

    //Event genreMenu
    const handleMenu =(genreId, genreName) => {
        dispatch(setGenreIdSeries(genreId));
        dispatch(setGenreNameSeries(genreName));
        dispatch(setSeriesPage(1))
        dispatch(setMenuOpen(false));
    }

    return (
        <Container>
            <Divider textAlign='left'>
                <CardHeader
                    title={
                        <Button onClick={() => dispatch(setMenuOpen(true))} endIcon={<ExpandMore />}>
                            {pageTitle}
                        </Button>
                    }
                    titleTypographyProps={{ fontSize: 20 }}
                    subheader={`" ${genreNameSeries} "`}
                />
            </Divider>
            <GenreMenu genresList={genresSeries} handleMenu={handleMenu}/>
            {isLoading ? (
                <CheckingAuth/>
            ) : (
                <>
                    <Pagination
                        page={seriesPage}
                        nextPage={nextPage}
                        prevPage={prevPage}
                    />
                    <MoviesList movies={series} favoritesId={favoritesId} />
                </>
            )}
        </Container>
    );
};
