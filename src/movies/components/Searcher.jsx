import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks';
import {
    setKeywordSearched,
    setSearchResultsPage,
} from '../../store/slices/movies/moviesSlice';
import Swal from 'sweetalert2';
import { Search } from '@mui/icons-material';
import { TextField, IconButton } from '@mui/material';

const initialForm = {
    keyword: '',
};
export const Searcher = ({ handleCloseNavMenu }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { keyword, onInputChange, onResetForm } = useForm(initialForm);

    //Event search by name
    const handleSubmit = e => {
        e.preventDefault();

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
            handleCloseNavMenu();
            onResetForm();
        }
    };

    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <TextField
                    id='outlined-size-small'
                    size='small'
                    type='text'
                    name='keyword'
                    value={keyword}
                    onChange={onInputChange}
                    autoComplete='off'
                    focused
                    placeholder='Quiero buscar...'
                    fullWidth
                    sx={{
                        ml: { xs: 0, md: 2 },
                        width: { xs: 'auto', md: 400 },
                    }}
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
