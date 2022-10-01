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
} from './moviesSlice';


//Get list movies genres
export const startGenresMoviesList = () => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint =
            'https://api.themoviedb.org/3/genre/movie/list?api_key=547964d6c1a35134a0272e9fd9b4e58c&language=en-US';
        
        const { data } = await axios.get(endPoint);
        dispatch(getGenresMovies([{"id": null,
        "name": "Todas"} ,...data.genres]));
    };
};

//Get list series genres
export const startGenresSeriesList = () => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint =
            'https://api.themoviedb.org/3/genre/tv/list?api_key=547964d6c1a35134a0272e9fd9b4e58c&language=en-US';

        const { data } = await axios.get(endPoint);
        dispatch(getGenresSeries([{"id": null,
        "name": "Todas"} ,...data.genres]));
    };
};

//Get  recommended movies from Api
export const startGetMovies = () => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint =
            'https://api.themoviedb.org/3/discover/movie?api_key=547964d6c1a35134a0272e9fd9b4e58c&language=es-Es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';

        const { data } = await axios.get(endPoint);
        dispatch(setMovies({ movies: data.results}));
        console.log('get movies!!!')
    };
};

//Get movies by genre from Api
export const startGetMoviesByGenre = (genreId) => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint =
            `https://api.themoviedb.org/3/discover/movie?api_key=547964d6c1a35134a0272e9fd9b4e58c&language=es-Es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${genreId}`;

        const { data } = await axios.get(endPoint);
        dispatch(setMovies({ movies: data.results}));
    };
};

//Get series by genre from Api
export const startGetSeriesByGenre = (genreId) => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint =
            `https://api.themoviedb.org/3/discover/tv?api_key=547964d6c1a35134a0272e9fd9b4e58c&language=es-Es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${genreId}`;

        const { data } = await axios.get(endPoint);
        dispatch(setSeries({ series: data.results}));
    };
};

//Get  recommended series from Api
export const startGetSeries = () => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint =
            'https://api.themoviedb.org/3/discover/tv?api_key=547964d6c1a35134a0272e9fd9b4e58c&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0';

        const { data } = await axios.get(endPoint);
        dispatch(setSeries({ series: data.results }));
    };
};

//Search Movies by keyword
export const startSearchMoviesByKeyword = (keyword) => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint =
        `https://api.themoviedb.org/3/search/movie?api_key=547964d6c1a35134a0272e9fd9b4e58c&language=es-Es&query=${keyword}`;

        const { data } = await axios.get(endPoint);
        dispatch(setMovies({ movies: data.results }));
    };
};

//Search Series by keyword
export const startSearchSeriesByKeyword = (keyword) => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint =
        `https://api.themoviedb.org/3/search/tv?api_key=547964d6c1a35134a0272e9fd9b4e58c&language=es-Es&query=${keyword}`;

        const { data } = await axios.get(endPoint);
        dispatch(setSeries({ series: data.results }));
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

        const favorites = docs.map(doc => ({ id: Number(doc.id), ...doc.data() }));

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
