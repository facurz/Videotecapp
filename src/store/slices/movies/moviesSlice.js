import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    selectedMovie: null,
    keywordSearched: null,
    media_type: null,
    favorites: [],
    favoritesId: [],
    movies: [],
    moviesPage: 1,
    genresMovies: [],
    genreId: null,
    genreName: 'Populares',
    series: [],
    seriesPage: 1,
    genresSeries: [],
    genreIdSeries: null,
    genreNameSeries: 'Populares',
    searchResults: [],
    searchResultsPage: 1,
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {

        //Global
        loadingMovies: state => {
            state.isLoading = true;
        },
        setSelectedMovie: (state, { payload }) => {
            state.selectedMovie = payload;
        },
        setKeywordSearched: (state, { payload }) => {
            state.isLoading = false;
            state.keywordSearched = payload;
        },
        setMediaType: (state, { payload }) => {
            state.isLoading = false;
            state.media_type = payload;
        },

        //Favorites
        getFavorites: (state, { payload }) => {
            state.favorites = payload;
            state.favoritesId = state.favorites.map(movie => Number(movie.id));
        },
        setFavorites: (state, { payload }) => {
            state.isLoading = false;
            state.favorites.push(payload);
            state.favoritesId.push(payload.id);
        },
        deleteFavoriteById: (state, { payload }) => {
            state.isLoading = false;
            state.favorites = state.favorites.filter(
                movie => movie.id !== payload.id
            );
            state.favoritesId = state.favorites.map(movie => Number(movie.id));
        },

        //Movies
        setMovies: (state, { payload }) => {
            state.isLoading = false;
            state.movies = payload.movies;
        },
        setMoviesPage: (state, { payload }) => {
            state.moviesPage = payload;
        },
        getGenresMovies: (state, { payload }) => {
            state.isLoading = false;
            state.genresMovies = payload;
        },
        setGenreName: (state, { payload }) => {
            state.genreName = payload;
        },
        setGenreId: (state, { payload }) => {
            state.genreId = payload;
        },

        //Series
        setSeries: (state, { payload }) => {
            state.isLoading = false;
            state.series = payload.series;
        },
        getGenresSeries: (state, { payload }) => {
            state.isLoading = false;
            state.genresSeries = payload;
        },
        setSeriesPage: (state, { payload }) => {
            state.seriesPage = payload;
        },
        setGenreNameSeries: (state, { payload }) => {
            state.genreNameSeries = payload;
        },
        setGenreIdSeries: (state, { payload }) => {
            state.genreIdSeries = payload;
        },

        //searchResults
        setSearchResults: (state, { payload }) => {
            state.isLoading = false;
            state.searchResults = payload;
        },
        setSearchResultsPage: (state, { payload }) => {
            state.searchResultsPage = payload;
        },

        //Logout
        clearAllLogout: state => {
            state.isLoading = false;
            state.selectedMovie = null;
            state.favorites = [];
            state.favoritesId = [];
            state.genresMovies = [];
            state.genresSeries = [];
            state.movies = [];
            state.series = [];
            state.searchResults = [];
            state.moviesPage = 1;
            state.seriesPage = 1;
            state.searchResultsPage = 1;
            state.keywordSearched = null;
            state.genreId = null;
            state.media_type = null;
            state.genreName = 'Populares';
        },
    },
});

export const {
    loadingMovies,
    getGenresMovies,
    getGenresSeries,
    getFavorites,
    setMovies,
    setGenreId,
    setFavorites,
    setSeries,
    setKeywordSearched,
    setMoviesPage,
    setSeriesPage,
    setMediaType,
    setSearchResults,
    setGenreName,
    setSearchResultsPage,
    setSelectedMovie,
    deleteFavoriteById,
    clearAllLogout,
    setGenreNameSeries,
    setGenreIdSeries,
} = moviesSlice.actions;

export default moviesSlice.reducer;
