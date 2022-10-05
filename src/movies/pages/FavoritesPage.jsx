import { CardHeader, Container, Divider } from '@mui/material';
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
       
        
        <MoviesList movies={favorites} favoritesId={favoritesId}/>
    </Container>
);
};
