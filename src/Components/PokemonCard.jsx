import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Types from '../../public/Types.json'
import Colors from '../../public/Colors.json'

const PokemonCard = ({url}) => {
  
  const [pokemon, setPokemon] = useState([])
  const navigate = useNavigate();

  const BackgrounImg = () => {
    const Color = []
    Types.map((type, index) => {
      if(type === pokemon.types?.[0]?.type.name) {
        Color.push(Colors[index])
      }
    })
    return Color
  }

  // "box-shadow": `0 0 10px ${BackgrounImg()}, 0 0 40px ${BackgrounImg()}, 0 0 80px ${BackgrounImg()}`

  useEffect(() => {
    axios.get(url)
    .then(res => setPokemon(res.data))
  }, [])

  console.log(pokemon)

  return (
    <div onClick={() => navigate(`/Pokedex/${pokemon.id}`)} className="pokeCard" style={{"border":`7px solid ${BackgrounImg()}`, "boxShadow":`0 0 10px ${BackgrounImg()}, 0 0 40px ${BackgrounImg()}, 0 0 80px ${BackgrounImg()}`}}> {/*`url(${})`*/}
    <h1>{pokemon.name}</h1>
    <p><b><div className='typename'></div>Types: </b>{pokemon.types?.[0]?.type.name}, {pokemon.types?.[1]?.type.name}</p>
    <p><b><div className='hp'></div>HP: </b>{pokemon.stats?.[0].base_stat}</p>
    <p><b> <div className='attack'></div> Attack: </b>{pokemon.stats?.[1].base_stat}</p>
    <p><b> <div className='defense'></div>Defense: </b>{pokemon.stats?.[2].base_stat}</p>
    <p><b><div className='speed'></div>Speed: </b>{pokemon.stats?.[5].base_stat}</p>
    <img src={pokemon.sprites?.other["official-artwork"].front_default} alt="" />
    </div>
  );
};

export default PokemonCard;