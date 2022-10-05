import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
    startGenresMoviesList,
    startGenresSeriesList,
    startGetMovies,
    startGetSeries,
    startLoadingFavorites,
} from '../../store/slices/movies/thunks';
import { NavBar } from '../components/NavBar';
import { DetailPage } from '../pages/DetailPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { MoviesPage } from '../pages/MoviesPage';
import { SeriesPage } from '../pages/SeriesPage';

export const MoviesRoutes = () => {
    const dispatch = useDispatch();
    const { moviesPage, seriesPage } = useSelector(state => state.movies);

    useEffect(() => {
        dispatch(startLoadingFavorites()); //Get favorites from Firebase
        dispatch(startGenresMoviesList()); // Get list movies genres
        dispatch(startGenresSeriesList()); // Get list series genres
    }, []);



    //Get recommended movies from Api
    useEffect(() => {
        dispatch(startGetMovies(moviesPage));
    }, [moviesPage]); 

    //Get recommended series from Api
    useEffect(() => {
        dispatch(startGetSeries(seriesPage));
    }, [seriesPage]); 
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<MoviesPage />} />
                <Route path='series' element={<SeriesPage />} />
                <Route path='favorites' element={<FavoritesPage />} />
                <Route path='/detail' element={<DetailPage />} />

                <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        </>
    );
};
