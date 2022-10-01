import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedMovie } from '../../store/slices/movies/moviesSlice';
import {
    startAddFavorites,
    startDeleteFavorites,
} from '../../store/slices/movies/thunks';
import { MovieCard } from './MovieCard';

export const MoviesList = ({ movies, favoritesId }) => {
    const dispatch = useDispatch();

    const onAddRemoveFavorites = movie => {
        dispatch(setSelectedMovie(movie));
        
        favoritesId.includes(movie.id)
            ? dispatch(startDeleteFavorites())
            : dispatch(startAddFavorites());
    };

    return (
        <>
            <ol>
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        favoritesId={favoritesId}
                        onAddRemoveFavorites={onAddRemoveFavorites}
                    />
                ))}
            </ol>
        </>
    );
};
