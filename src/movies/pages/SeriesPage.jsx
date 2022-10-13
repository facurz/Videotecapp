import React, { useEffect } from 'react';
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
import {
    Button,
    CardHeader,
    Container,
    Divider,
    IconButton,
} from '@mui/material';
import { ArrowCircleUpTwoTone, ExpandMore } from '@mui/icons-material';
import { CheckingAuth } from '../../auth/components/CheckingAuth';

export const SeriesPage = () => {
    const dispatch = useDispatch();
    const {
        totalSeriesPages,
        seriesPage,
        series,
        favorites,
        favoritesId,
        genreNameSeries,
        genresSeries,
        isLoading,
    } = useSelector(state => state.movies);

    const pageTitle = 'SERIES';

    //Set pagination to 1
    useEffect(() => {
        dispatch(setSeriesPage(1));
    }, []);

    //Update movies when favorites change
    useEffect(() => {
        dispatch(setSeries({ series }));
    }, [favorites]);

    //Event handle pagination
    const handleChange = (event, value) => {
        dispatch(setSeriesPage(value))
    };

    //Event genreMenu
    const handleMenu = (genreId, genreName) => {
        dispatch(setGenreIdSeries(genreId));
        dispatch(setGenreNameSeries(genreName));
        dispatch(setSeriesPage(1));
        dispatch(setMenuOpen(false));
    };

    return (
        <Container sx={{ position: 'relative' }}>
            <Divider textAlign='left'>
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
                    subheader={`" ${genreNameSeries} "`}
                />
            </Divider>
            <GenreMenu genresList={genresSeries} handleMenu={handleMenu} />
            {isLoading ? (
                <CheckingAuth />
            ) : (
                <>
                    <Pagination
                        page={seriesPage}
                        totalPages={totalSeriesPages}
                        handleChange={handleChange}
                    />
                    <MoviesList movies={series} favoritesId={favoritesId} />
                    <IconButton
                        component='a'
                        href='#top'
                        aria-label='ArrowCircleUpTwoTone'
                        sx={{
                            position: 'fixed',
                            bottom: 5,
                            right: 'calc(50vw - 25px)',
                        }}
                    >
                        <ArrowCircleUpTwoTone
                            color='primary'
                            sx={{ fontSize: 50 }}
                        />
                    </IconButton>
                </>
            )}
        </Container>
    );
};
