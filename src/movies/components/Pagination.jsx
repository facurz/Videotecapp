import { SkipNextOutlined, SkipPreviousOutlined } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

export const Pagination = ({page, prevPage, nextPage, totalPages}) => {
    return (
        <>
            
                <div className='container d-flex  mx-auto justify-content-center align-items-center'>
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
                        disabled={page === totalPages}
                    >
                        <SkipNextOutlined fontSize='medium' />
                    </IconButton>
                </div>
            
        </>
    );
};
