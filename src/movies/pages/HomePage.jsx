import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies, setSelectedMovie } from '../../store/slices/movies/moviesSlice';
import {
    startAddMovieToFavorites,
    startDeleteFavorites,
} from '../../store/slices/movies/thunks';

export const HomePage = () => {
    const dispatch = useDispatch();

    const { movies, favoritesMovies, favoritesId} = useSelector(state => state.movies);

    useEffect(() => {
        dispatch(setMovies({movies}));
    }, [favoritesMovies]);

    

    const onAddFavorites = movie => {
        dispatch(setSelectedMovie(movie));
        (favoritesId?.includes(movie.id))
        ?dispatch(startDeleteFavorites())
        :dispatch(startAddMovieToFavorites())
        };


    return (
        <>
            <h1>Discover: </h1>
            <hr />

            <ol>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <h1>{movie.title}</h1>
                        {movie.title}
                        <p>{movie.overview}</p>
                        <button className={ favoritesId?.includes(movie.id)? 'in' : 'out'} onClick={() => onAddFavorites(movie)}>
                            Favorite
                        </button>
                    </li>
                ))}
            </ol>
        </>
    );
};
