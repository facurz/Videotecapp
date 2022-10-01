import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { startLogout } from '../../store/slices/auth/thunks';


export const NavBar = () => {
  const dispatch = useDispatch();
  
  const onLogout = () => {
    dispatch(startLogout());
};
  return (
    <nav>
        <Link to='/'>Pelis</Link>
        <Link to='/series'>Series</Link>
        <Link to='/favorites'>Favoritos</Link>
        
        <button onClick={onLogout}>Logout</button>
    </nav>
  )
}
