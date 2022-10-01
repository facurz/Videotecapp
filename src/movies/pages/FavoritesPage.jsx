import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/slices/auth/thunks';
import { setSelectedMovie } from '../../store/slices/movies/moviesSlice';
import { startDeleteFavorites } from '../../store/slices/movies/thunks';

export const FavoritesPage = () => {
    const dispatch = useDispatch();

    const { favorites} = useSelector(state => state.movies);
    

    const onLogout = () => {
        dispatch(startLogout());
    };

    const onDeleteFavorites = movie => {
        dispatch(setSelectedMovie(movie));
        dispatch(startDeleteFavorites());

       
    };
    return (
        <>
            <h1>Favoritos: </h1>
            <hr />
            <ol>
                {favorites.map(movie => (
                    <li key={movie.id}>
                        <h1>{movie.title || movie.name}</h1>
                        {movie.title || movie.name}
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
