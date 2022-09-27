import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    // page: 0,
    selectedMovie: null,
    movies: [],
    favoritesMovies: [],
    favoritesId:[],
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        loadingMovies: state => {
            state.isLoading = true;
        },
        getFavoritesMovies:(state, {payload})=>{
            state.favoritesMovies = payload;
            state.favoritesId = state.favoritesMovies.map(movie => Number(movie.id));
        },
        setSelectedMovie: (state, { payload }) => {
            state.selectedMovie = payload;
        },
        
        setMovies: (state, { payload }) => {
            // state.page = action.payload.page;
            state.isLoading = false;
            state.movies = payload.movies;
        },
        setFavoritesMovies: (state, { payload }) => {
            // state.page = action.payload.page;
            state.isLoading = false;
            state.favoritesMovies.push(payload);
            state.favoritesId.push(payload.id);
        },

        clearAllLogout: state => {
            state.isLoading = false;
            state.movies = [];
            state.favoritesMovies = [];
            state.selectedMovie = null;
            state.favoritesId = [];
        },

        deleteFavoriteMovieById: (state, {payload}) => {
            state.isLoading = false;
            state.favoritesMovies = state.favoritesMovies.filter(movie => movie.id !== payload.id);
            state.favoritesId = state.favoritesMovies.map(movie => Number(movie.id));
          },
    },
});

export const {
    loadingMovies,
    getFavoritesMovies,
    setMovies,
    setFavoritesMovies,
    setSelectedMovie,
    deleteFavoriteMovieById,
    clearAllLogout,
} = moviesSlice.actions;

export default moviesSlice.reducer;
