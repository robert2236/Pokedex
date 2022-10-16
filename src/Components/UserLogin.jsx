import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/userName.slice';

const UserLogin = () => {

  const dispatch = useDispatch();

  const [userName, setUserName] = useState("")

  const navigate = useNavigate();

  const dispatchUserName = () => {
    dispatch(changeName(userName))
    navigate("/Pokedex")
  }

  return (
    <div className='PokeUser'>
      <div className='pokedexLogo'></div>
       <h1>User Login</h1>
      <input type="text" value={userName} onChange={e => setUserName(e.target.value)}/>
      <button onClick={dispatchUserName} className="pokeButton"></button>
    </div>
  );
};

export default UserLogin;
