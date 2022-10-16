import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import Types from '../../public/Types.json'
import Colors from '../../public/Colors.json'


const Pokedex = () => {
  const name = useSelector(state => state.userName)

  const [pokemonList, setPokemonList] = useState([])
  const [searchtype, setSearchType] = useState([])
  const [searchPokemon, setSearchPokemon] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1500&offset=0') // "https://pokeapi.co/api/v2/ability/?limit=20&offset=20"
      .then(res => setPokemonList(res.data.results))

    axios.get('https://pokeapi.co/api/v2/type/')  
    .then(res => setSearchType(res.data.results))
  }, [])


  const searchName = () => {
    navigate(`/Pokedex/${searchPokemon}`)
  }

  const typeList = (typeUrl) => {
    axios.get(typeUrl)
    .then(res => setPokemonList(res.data.pokemon))
  }

  // console.log(pokemonList)

  console.log(searchtype)
  
  const [page, setPage] = useState(1);
  const charactersPerPage = 24;
  const lastCharacterIndex = page * charactersPerPage; //15;
  const firstCharacterIndex = lastCharacterIndex - charactersPerPage; // 10
  const charactersPaginated = pokemonList.slice(
    firstCharacterIndex,
    lastCharacterIndex
  );
  const totalPages = Math.ceil(pokemonList.length / charactersPerPage);
  const pagesNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesNumbers.push(i);
  }

  const BackgrounImg = () => {
    const Color = []
    Types.map((type, index) => {
      if(type === pokemon.types?.[0]?.type.name) {
        Color.push(Colors[index])
      }
    })
    return Color
  }

  return (
    <div className='pokeBack'>
      <h1>Pokedex</h1>
      <span>Welcome Pokemon Master {name}!</span>

      <div className='SearchPokedex'>
        <input type="text" placeholder='Search Pokemon' value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)}  />
        <button onClick={searchName}></button>

        <select onChange={e => typeList(e.target.value)}> 
          {searchtype.map((type) => (
            <option value={type.url} key={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className='cardContainer'>
      {charactersPaginated.map((pokemon) => (
        <PokemonCard url={pokemon.url ? pokemon.url : pokemon.pokemon.url} key={pokemon.url ? pokemon.url : pokemon.pokemon.url} />
      ))}
      </div>
     <div className='page'> 
     <button onClick={() => setPage(page - 1)} disabled={page === 1} className='PagePrev'>
      
      </button>
      {pagesNumbers.map((number) => (
        <button onClick={() => setPage(number)} key={number}>{number}</button>
      ))}
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className='PageNext'>
       
        </button>
      </div>
    </div>
  );
};

export default Pokedex;