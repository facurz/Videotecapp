import { CircularProgress, Grid } from '@mui/material'

export const CheckingAuth = () => {
  return (
    <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ minHeight: '100vh', backgroundColor: 'primary', padding: 4 }}
    >
       <CircularProgress  color='primary' />     
    </Grid>
  )
}
