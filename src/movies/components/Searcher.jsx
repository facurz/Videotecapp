import { Paper, Button, Grid, Divider, Chip } from '@mui/material';

export const Searcher = ({ genres, onSubmit, onSelectGenre }) => {
    return (
        <>
            <form
                className='d-flex align-items-center'
                onSubmit={e => onSubmit(e)}
            >
                <input
                    className='form-control mb-0 mx-2'
                    type='text'
                    name='keyword'
                    placeholder='Quiero buscar...'
                />
                <button className='btn btn-success' type='submit'>
                    Buscar
                </button>
            </form>
            <Divider sx={{mt: 2, mb:2}} />
            <Grid container spacing={1}>
                {genres.map(genre => (
                    <Grid item key={genre.id} xs={1.5} textAlign='center'>
                        <Paper elevation={3}>
                            <Button
                                variant='text'
                                onClick={() => onSelectGenre(`${genre.id}`)}
                                sx={{fontSize: 10, width: '100%'}}
                            >
                                {genre.name}
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
