import axios from 'axios';
import {
    collection,
    doc,
    setDoc,
    getDocs,
    deleteDoc,
} from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../firebase/config';
import {
    deleteFavoriteById,
    getFavorites,
    setFavorites,
    setMovies,
    loadingMovies,
    setSeries,
    getGenresMovies,
    getGenresSeries,
    setSearchResults,
} from './moviesSlice';
import { getEnvironment } from '../../../helpers/getEnvironment';

const {
    VITE_TMDBKEY
} = getEnvironment();



//Get list movies genres
export const startGenresMoviesList = () => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint =
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${VITE_TMDBKEY}&language=en-US`;

        const { data } = await axios.get(endPoint);
        dispatch(
            getGenresMovies([{ id: null, name: 'Populares' }, ...data.genres])
        );
    };
};

//Get list series genres
export const startGenresSeriesList = () => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint =
            `https://api.themoviedb.org/3/genre/tv/list?api_key=${VITE_TMDBKEY}&language=en-US`;

        const { data } = await axios.get(endPoint);
        dispatch(
            getGenresSeries([{ id: null, name: 'Populares' }, ...data.genres])
        );
    };
};

//Get movies from Api
export const startGetMovies = (moviesPage, genreId) => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${VITE_TMDBKEY}&language=es-Es&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&with_genres=${genreId}&page=${moviesPage}`;

        const { data } = await axios.get(endPoint);
        const results = data.results.map(
            el => (el = { ...el, media_type: 'movie' })
        );
        dispatch(setMovies({ movies: results, totalPages: results.total_pages }));
        console.log('get movies!');
    };
};

//Get series from Api
export const startGetSeries = (seriesPage, genreIdSeries) => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint = `https://api.themoviedb.org/3/discover/tv?api_key=${VITE_TMDBKEY}&language=es-Es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${genreIdSeries}&page=${seriesPage}`;

        const { data } = await axios.get(endPoint);
        const results = data.results.map(
            el => (el = { ...el, media_type: 'tv' })
        );
        dispatch(setSeries({ series: results }));
        console.log('get series!');
    };
};

//Search by keyword
export const startSearchMoviesByKeyword = (
    keywordSearched,
    searchResultsPage
) => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint = `https://api.themoviedb.org/3/search/multi?api_key=${VITE_TMDBKEY}&language=es-Es&query=${keywordSearched}&page=${searchResultsPage}`;

        const { data } = await axios.get(endPoint);
        const payload = data.results.filter(el => !el.known_for);
        dispatch(setSearchResults(payload));
    };
};

/*--------------------------------------------- FIRESBASE ---------------------------------------------  */

//Get favorites from Firebase
export const startLoadingFavorites = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const collectionRef = collection(
            FirebaseDB,
            `${uid}/favoritesMovies/movie`
        );
        const { docs } = await getDocs(collectionRef);

        const favorites = docs.map(doc => ({
            id: Number(doc.id),
            ...doc.data(),
        }));

        dispatch(getFavorites(favorites));
    };
};

export const startAddFavorites = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { selectedMovie } = getState().movies;

        const movieToFireStore = { ...selectedMovie };
        delete movieToFireStore.id;

        const docRef = doc(
            FirebaseDB,
            `${uid}/favoritesMovies/movie/${selectedMovie.id}`
        );

        await setDoc(docRef, movieToFireStore, { merge: true });
        dispatch(setFavorites(selectedMovie));
    };
};

export const startDeleteFavorites = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { selectedMovie } = getState().movies;

        const docRef = doc(
            FirebaseDB,
            `${uid}/favoritesMovies/movie/${selectedMovie.id}`
        );

        await deleteDoc(docRef);
        dispatch(deleteFavoriteById(selectedMovie));
    };
};
