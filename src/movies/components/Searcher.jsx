import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    setKeywordSearched,
    setSearchResultsPage,
} from '../../store/slices/movies/moviesSlice';
import { Search } from '@mui/icons-material';
import { TextField, IconButton } from '@mui/material';
import Swal from 'sweetalert2'

export const Searcher = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Event search by name
    const handleSubmit = e => {
        e.preventDefault();
        const keyword = e.target.keyword.value.trim();

        if (!keyword) {
            Swal.fire({
                text: 'Debes escribir algo',
                icon: 'question',
                confirmButtonText: 'OK',
            });
        } else {
            dispatch(setKeywordSearched(keyword));
            dispatch(setSearchResultsPage(1));
            navigate('multiSearch');
        }
    };

    return (
        <>
            <form onSubmit={e => handleSubmit(e)} >
                <TextField
                    id='outlined-size-small'
                    size='small'
                    type='text'
                    name='keyword'
                    autoComplete='off'
                    focused
                    placeholder='Quiero buscar...'
                    fullWidth
                    sx={{ml: 2, width: 400}}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                type='submit'
                                position='end'
                                sx={{ p: '10px' }}
                                aria-label='search'
                            >
                                <Search />
                            </IconButton>
                        ),
                    }}
                />
            </form>
        </>
    );
};
