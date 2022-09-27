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
    deleteFavoriteMovieById,
    getFavoritesMovies,
    setFavoritesMovies,
    setMovies,
    loadingMovies,
} from './moviesSlice';

//Get Movies from Api
export const startGetMovies = () => {
    return async dispatch => {
        dispatch(loadingMovies());
        const endPoint =
            'https://api.themoviedb.org/3/discover/movie?api_key=547964d6c1a35134a0272e9fd9b4e58c&language=es-Es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';

        const { data } = await axios.get(endPoint);

        dispatch(setMovies({ movies: data.results }));
        console.log('getMovies!!!')
    };
};

//Get favorites from Firestore
export const startLoadingFavorites = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const collectionRef = collection(
            FirebaseDB,
            `${uid}/favoritesMovies/movie`
        );
        const { docs } = await getDocs(collectionRef);

        const favorites = docs.map(doc => ({ id: doc.id, ...doc.data() }));

        dispatch(getFavoritesMovies(favorites));
    };
};


export const startAddMovieToFavorites = () => {
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

        dispatch(setFavoritesMovies(selectedMovie));
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

        dispatch(deleteFavoriteMovieById(selectedMovie));
    };
};
