import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/slices/auth/thunks';
import { setSelectedMovie } from '../../store/slices/movies/moviesSlice';
import { startDeleteFavorites } from '../../store/slices/movies/thunks';

export const FavoritesPage = () => {
    const dispatch = useDispatch();

    const { favoritesMovies } = useSelector(state => state.movies);

    const onLogout = () => {
        dispatch(startLogout());
    };

    const onDeleteFavorites = movie => {
        dispatch(setSelectedMovie(movie));
        dispatch(startDeleteFavorites());
    };
    return (
        <>
            <h1>Favorites: </h1>
            <hr />
            <button onClick={onLogout}>Logout</button>

            <ol>
                {favoritesMovies.map(movie => (
                    <li key={movie.id}>
                        <h1>{movie.title}</h1>
                        {movie.title}
                        <p>{movie.overview}</p>
                        <button onClick={() => onDeleteFavorites(movie)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ol>
        </>
    );
};
