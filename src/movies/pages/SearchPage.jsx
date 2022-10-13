import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResultsPage } from '../../store/slices/movies/moviesSlice';
import { startSearchMoviesByKeyword } from '../../store/slices/movies/thunks';
import { MoviesList } from '../components/MoviesList';
import { Pagination } from '../components/Pagination';
import { CardHeader, Container, Divider, IconButton } from '@mui/material';
import { CheckingAuth } from '../../auth/components/CheckingAuth';
import Swal from 'sweetalert2';
import { ArrowCircleUpTwoTone } from '@mui/icons-material';

export const SearchPage = () => {
    const dispatch = useDispatch();

    const {
        searchResults,
        searchResultsPage,
        keywordSearched,
        favoritesId,
        isLoading,
    } = useSelector(state => state.movies);

    const pageTitle = 'BÚSQUEDA';


    //Mount and update searchResults when params change
    useEffect(() => {
        dispatch(
            startSearchMoviesByKeyword(keywordSearched, searchResultsPage)
        );
    }, [keywordSearched, searchResultsPage]);

    //Events handle pagination
    const prevPage = () => {
        dispatch(setSearchResultsPage(searchResultsPage - 1));
    };

    const nextPage = () => {
        dispatch(setSearchResultsPage(searchResultsPage + 1));
    };

    return (
        <Container>
            <Divider textAlign='left'>
                <CardHeader
                    title={`${pageTitle}`}
                    titleTypographyProps={{ fontSize: 20 }}
                    subheader={`"${keywordSearched}"`}
                />
            </Divider>
            {isLoading ? (
                <CheckingAuth/>
            ) : (
                <>
                    <Pagination
                        page={searchResultsPage}
                        nextPage={nextPage}
                        prevPage={prevPage}
                    />
                    <MoviesList
                        movies={searchResults}
                        favoritesId={favoritesId}
                    />
                    <IconButton component='a' href='#top' aria-label='ArrowCircleUpTwoTone'  sx={{position: 'fixed', bottom: {xs:1, md:16}, right: {xs:1, md:16}}}>
                        <ArrowCircleUpTwoTone color='primary' sx={{fontSize: 40}}/>
                    </IconButton>
                </>
            )}
        </Container>
    );
};
