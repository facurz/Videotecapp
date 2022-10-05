import { SkipNextOutlined, SkipPreviousOutlined } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

export const Pagination = ({page, prevPage, nextPage}) => {
    return (
        <>
            
                <div className='container d-flex m-4 mx-auto justify-content-center align-items-center'>
                    <IconButton
                        onClick={prevPage}
                        size='large'
                        color='primary'
                        aria-label='prevPage'
                        disabled={page < 2}
                    >
                        <SkipPreviousOutlined fontSize='medium' />
                    </IconButton>

                    <div className='page mx-2'>
                        <Typography variant='h6' component='p' color='primary'>
                            Página {page}
                        </Typography>
                    </div>

                    <IconButton
                        onClick={nextPage}
                        size='large'
                        color='primary'
                        aria-label='nextPage'
                    >
                        <SkipNextOutlined fontSize='medium' />
                    </IconButton>
                </div>
            
        </>
    );
};
