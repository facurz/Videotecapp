import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { startLogout } from '../../store/slices/auth/thunks';
import './searcher.css'
import logoFilm from '../../assets/logoFilm.png'


export const NavBar = () => {
  const dispatch = useDispatch();
  
  const onLogout = () => {
    dispatch(startLogout());
};
  return (
    <nav>
      
      <img src={logoFilm} width={120} height={70} />
     
    
        <Link to='/'>Pelis</Link>
        <Link to='/series'>Series</Link>
        <Link to='/favorites'>Favoritos</Link>
        
        <button onClick={onLogout}>Logout</button>
    </nav>
  )
}
