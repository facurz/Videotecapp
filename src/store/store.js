import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth/authSlice';
import  moviesSlice  from './slices/movies/moviesSlice';

export const store = configureStore({
    reducer:{
        auth: authSlice,
        movies: moviesSlice,
    } 
})