import { Routes, Route, Navigate } from 'react-router-dom';
import { CheckingAuth } from '../auth/components/CheckingAuth';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { MoviesRoutes } from '../movies/routes/MoviesRoutes';

export const AppRouter = () => {

  const { status } = useCheckAuth();

  if(status === 'checking') return <CheckingAuth />

  return (
    <Routes>
        {
          status === 'authenticated'
          ? <Route path='/*' element={<MoviesRoutes />} />
          : <Route path='/auth/*' element={<AuthRoutes />} />
        } 

        <Route path='/*' element={<Navigate to='/auth/login' />} />      

    </Routes>        
  )
}



