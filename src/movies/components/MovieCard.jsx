import * as React from 'react';
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
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, favoritesId, onAddRemoveFavorites }) => {
    const id = movie.id;
    const title = movie.title || movie.name;
    const overview = movie.overview;
    const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const rating = Number(movie.vote_average) / 2;

    return (
        <Grid item xs={3}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={
                        title.length > 23
                            ? title.substring(0, 22) + '...'
                            : title
                    }
                    titleTypographyProps={{ fontSize: 20, display: 'inline' }}
                />
                <Box component={Link} to={`/detail?movieID=${id}`}>
                    <CardMedia
                        component='img'
                        height='370'
                        image={poster}
                        alt={title}
                    />
                </Box>
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
                        component={Link}
                        to={`/detail?movieID=${id}`}
                        size='small'
                    >
                        Ver Mas
                    </Button>
                </Stack>
            </Card>
        </Grid>
    );
};
