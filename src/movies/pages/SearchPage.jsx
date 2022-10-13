import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResultsPage} from '../../store/slices/movies/moviesSlice';
import { startSearchMoviesByKeyword } from '../../store/slices/movies/thunks';
import { MoviesList } from '../components/MoviesList';
import { Pagination } from '../components/Pagination';
import { CardHeader, Container, Divider, IconButton } from '@mui/material';
import { CheckingAuth } from '../../auth/components/CheckingAuth';
import { ArrowCircleUpTwoTone } from '@mui/icons-material';

export const SearchPage = () => {
    const dispatch = useDispatch();

    const {
        totalResultsPages,
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

   //Event handle pagination
   const handleChange = (event, value) => {
    dispatch(setSearchResultsPage(value))
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
                <CheckingAuth />
            ) : (
                <>
                    <Pagination
                        page={searchResultsPage}
                        totalPages={totalResultsPages}
                        handleChange={handleChange}
                    />
                    <MoviesList
                        movies={searchResults}
                        favoritesId={favoritesId}
                    />
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
