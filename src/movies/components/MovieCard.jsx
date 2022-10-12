import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMediaType } from '../../store/slices/movies/moviesSlice';
import Card from '@mui/material/Card';
import {
    IconButton,
    Typography,
    CardHeader,
    CardMedia,
    CardContent,
    Grid,
    Rating,
    Box,
    Button,
    Stack,
} from '@mui/material';
import { Favorite, Star } from '@mui/icons-material';

export const MovieCard = ({ movie, favoritesId, onAddRemoveFavorites }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const id = movie.id;
    const title = movie.title || movie.name;
    const overview = movie.overview;
    const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const rating = Number(movie.vote_average) / 2;
    const media_type = movie.media_type;


    const handleClick = () => {
        dispatch(setMediaType(media_type))
        navigate(`/detail?id=${id}`)
        
    }

    return (
        <Grid item xs={10} md={3}>
            <Card sx={{ maxWidth: 345}}>
                <CardHeader
                    title={
                        title.length > 23
                            ? title.substring(0, 22) + '...'
                            : title
                    }
                    titleTypographyProps={{ fontSize: 20, display: 'inline' }}
                />
                <Stack component={Button} onClick={handleClick} fullWidth >
                    <CardMedia
                        component='img'
                        height={{md:370, xs:300}}
                        image={poster}
                        alt={title}
                        loading='lazy'
                    />
                </Stack>
                <CardContent sx={{ pb: 0 }}>
                    <Typography variant='body2' color='text.secondary'>
                        {overview.length > 130
                            ? overview.substring(0, 130) + '...'
                            : overview}
                    </Typography>
                </CardContent>
                <Stack
                    direction='row'
                    justifyContent='space-around'
                    alignItems='center'
                >
                    <IconButton
                        onClick={() => onAddRemoveFavorites(movie)}
                        aria-label='add to favorites'
                    >
                        <Favorite
                            color={
                                favoritesId.includes(id)
                                    ? 'primary'
                                    : 'disabled'
                            }
                        />
                    </IconButton>
                    <Rating
                        name='text-feedback'
                        value={rating}
                        readOnly
                        precision={0.5}
                        sx={{ fontSize: 15 }}
                        emptyIcon={
                            <Star
                                style={{ opacity: 0.55 }}
                                fontSize='inherit'
                            />
                        }
                    />
                    <Button
                        aria-label='view details'
                        onClick={handleClick}
                        size='small'
                    >
                        Ver Mas
                    </Button>
                </Stack>
            </Card>
        </Grid>
    );
};
