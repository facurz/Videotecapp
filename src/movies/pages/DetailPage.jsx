import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CardHeader, Container, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { CheckingAuth } from '../../auth/components/CheckingAuth';

export const DetailPage = () => {
    let query = new URLSearchParams(window.location.search);
    let id = query.get('id');
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const { media_type } = useSelector(state => state.movies);

    const onNavigateBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=547964d6c1a35134a0272e9fd9b4e58c&language=es-Es`;
        axios
            .get(endPoint)
            .then(response => {
                const movieData = response.data;
                setMovie(movieData);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return (
        <Container>
            <Divider textAlign='left'>
                <CardHeader
                    title={movie?.title}
                    titleTypographyProps={{ fontSize: 20 }}
                />
            </Divider>
            <main>
                {!movie && <CheckingAuth/>}

                {movie && (
                    <div className='container'>
                        <div className='row'>
                            <div className='col-4'>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    className='img-fluid'
                                    alt='Poster'
                                />
                            </div>
                            <div className='col-8'>
                                <h5>Fecha estreno: {movie.release_date}</h5>
                                <h5>Reseña:</h5>
                                <p>{movie.overview}</p>
                                <h5>Rating: {movie.vote_average}</h5>
                                <h5>Géneros:</h5>
                                <ul>
                                    {movie?.genres.map(oneGenre => (
                                        <li key={oneGenre.id}>
                                            {oneGenre.name}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    style={{ backgroundColor: '#18978F' }}
                                    className='btn btn-outline-light '
                                    onClick={onNavigateBack}
                                >
                                    Back...
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </Container>
    );
};