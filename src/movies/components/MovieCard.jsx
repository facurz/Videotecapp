import * as React from 'react';
import Card from '@mui/material/Card';
import {
    IconButton,
    Typography,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
} from '@mui/material';
import { MoreHoriz, Favorite } from '@mui/icons-material';



export const MovieCard = ({ movie, favoritesId, onAddRemoveFavorites }) => {
    const id = movie.id;
    const title = movie.title || movie.name;
    const overview = movie.overview;
    const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const rating = `Rating: ${movie.vote_average}`;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader title={title} subheader={rating} />
            <CardMedia
                component='img'
                height='194'
                image={poster}
                alt={title}
            />
            <CardContent>
                <Typography variant='body2' color='text.secondary'>
                    {overview.length > 150
                    ? overview.substring(0, 150) + '...'
                    : overview }
                    
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton 
                             onClick={()=>onAddRemoveFavorites(movie)} aria-label='add to favorites'
                             >
                    <Favorite color={favoritesId.includes(id) ? 'secondary' : 'disabled'} />
                </IconButton>
                <IconButton aria-label='add to favorites'>
                    <MoreHoriz />
                </IconButton>
            </CardActions>
        </Card>
    );
};

{
    /* return (
        <>
            
                    <li key={id}>
                        <h1>{title}</h1>
                        <img src={poster} alt={title} />
                        <p>{overview}</p>
                        <button
                            className={
                                favoritesId?.includes(id) ? 'in' : 'out'
                            }
                             onClick={()=>onAddRemoveFavorites(movie)}
                         >
                             Favorite
                         </button>
                     </li>
            
         </>
     );
};
 */
}
