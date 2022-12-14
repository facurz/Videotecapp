import { ArrowCircleUpTwoTone } from '@mui/icons-material';
import { CardHeader, Container, Divider, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { MoviesList } from '../components/MoviesList';

export const FavoritesPage = () => {
    const { favorites, favoritesId } = useSelector(state => state.movies);

    return (
        <Container>
            <Divider textAlign='left'>
                <CardHeader
                    title='FAVORITOS'
                    titleTypographyProps={{ fontSize: 20 }}
                    subheader='Pelis y Series'
                />
            </Divider>

            <MoviesList movies={favorites} favoritesId={favoritesId} />
            <IconButton
                component='a'
                href='#top'
                aria-label='ArrowCircleUpTwoTone'
                sx={{
                    position: 'fixed',
                    bottom: 5,
                    right: 'calc(50vw - 25px)',
                }}
            >
                <ArrowCircleUpTwoTone color='primary' sx={{ fontSize: 50 }} />
            </IconButton>
        </Container>
    );
};
