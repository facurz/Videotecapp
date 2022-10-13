import { Stack, Pagination as PaginationMui } from '@mui/material';

export const Pagination = ({ page, totalPages, handleChange }) => {

    const count = (totalPages <= 50) ? totalPages : 50;

    return (
        <>
            <Stack spacing={1} mb={2} alignItems='center'>
                <PaginationMui count={count} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
            </Stack>
        </>
    );
};
