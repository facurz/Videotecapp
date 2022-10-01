import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { startGenresMoviesList, startGenresSeriesList, startGetMovies, startGetSeries, startLoadingFavorites } from '../../store/slices/movies/thunks';
import { NavBar } from '../components/NavBar';
import { FavoritesPage } from '../pages/FavoritesPage';
import { MoviesPage} from '../pages/MoviesPage';
import { SeriesPage } from '../pages/SeriesPage';

export const MoviesRoutes = () => {
    
    const dispatch = useDispatch()
   
    
    useEffect(() => {
        dispatch(startLoadingFavorites()) //Get favorites from Firebase 
        dispatch(startGetMovies()); //Get recommended movies from Api 
        dispatch(startGetSeries()); //Get recommended series from Api 
        dispatch(startGenresMoviesList())  // Get list movies genres
        dispatch(startGenresSeriesList())  // Get list series genres
    }, []);

   

    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<MoviesPage />} />
                <Route path='series' element={<SeriesPage />} />
                <Route path='favorites' element={<FavoritesPage />} />

                <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        </>
    );
};
