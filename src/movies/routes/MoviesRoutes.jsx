import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { startGetMovies, startLoadingFavorites } from '../../store/slices/movies/thunks';
import { NavBar } from '../components/NavBar';
import { FavoritesPage } from '../pages/FavoritesPage';
import { HomePage } from '../pages/HomePage';

export const MoviesRoutes = () => {
    
    const dispatch = useDispatch()
   
    //Get favorites from Firebase once
    useEffect(() => {
        dispatch(startLoadingFavorites())
    }, []);

    useEffect(() => {
        dispatch(startGetMovies());
    }, []);

    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='favorites' element={<FavoritesPage />} />

                <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        </>
    );
};
