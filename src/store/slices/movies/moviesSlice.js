import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    // page: 0,
    selectedMovie: null,
    movies: [],
    favorites: [],
    favoritesId:[],
    series:[],
    genresMovies:[],
    genresSeries:[],
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        loadingMovies: state => {
            state.isLoading = true;
        },
        getGenresMovies: (state, { payload }) => {
            // state.page = action.payload.page;
            state.isLoading = false;
            state.genresMovies= payload;
        },
        getGenresSeries: (state, { payload }) => {
            // state.page = action.payload.page;
            state.isLoading = false;
            state.genresSeries = payload;
        },
        getFavorites:(state, {payload})=>{
            state.favorites = payload;
            state.favoritesId = state.favorites.map(movie => Number(movie.id));
        },
        setSelectedMovie: (state, { payload }) => {
            state.selectedMovie = payload;
        },
        setMovies: (state, { payload }) => {
            // state.page = action.payload.page;
            state.isLoading = false;
            state.movies = payload.movies;
        },
        setFavorites: (state, { payload }) => {
            // state.page = action.payload.page;
            state.isLoading = false;
            state.favorites.push(payload);
            state.favoritesId.push(payload.id);
        },
        setSeries: (state, {payload}) =>{
            state.isLoading = false;
            state.series = payload.series;
        },
        deleteFavoriteById: (state, {payload}) => {
            state.isLoading = false;
            state.favorites = state.favorites.filter(movie => movie.id !== payload.id);
            state.favoritesId = state.favorites.map(movie => Number(movie.id));
          },
        clearAllLogout: state => {
            state.isLoading = false;
            state.movies = [];
            state.favorites = [];
            state.selectedMovie = null;
            state.favoritesId = [];
        },
    },
});

export const {
    loadingMovies,
    getGenresMovies,
    getGenresSeries,
    getFavorites,
    setMovies,
    setFavorites,
    setSeries,
    setSelectedMovie,
    deleteFavoriteById,
    clearAllLogout,
} = moviesSlice.actions;

export default moviesSlice.reducer;
