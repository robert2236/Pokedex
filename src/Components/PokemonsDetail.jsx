import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Types from '../../public/Types.json'
import Colors from '../../public/Colors.json'


const PokemonsDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => setPokemon(res.data))
  }, [id])


  const stateColor = (stat) => {
    const color = Math.ceil((stat*100) / 150)
    console.log(color)
    return color
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

  // console.log(pokemon)

  return (
    <section className='detailCard'>
      <div className='logo'></div>
      <div className='imgCard'> <img src={pokemon.sprites?.other["official-artwork"].front_default} alt="" /> </div>
      <div className='wh'><h3>{pokemon.weight} <br /> Weight</h3> <h3>{pokemon.height} <br /> Height</h3></div>
      <h1>{pokemon.name}</h1>
      <div className='whId'>#{pokemon.id}</div>

      <section className='TAContainer'>

        <div className='typeContainer'>
        <h2>Type</h2>
        <div className='typeText'>
         {
          pokemon.types?.map((type) => (
            <h3 key={type.type.name}>{type.type.name}</h3>
          ))
         }
        </div>
        </div>

        <div className='AbilitiesContainer'>
          <h2>Abilities</h2>
          <div className='AbilitiesText'>
          {
            pokemon.abilities?.map((ability) => (
              <h3 key={ability.ability.name}>{ability.ability.name}</h3>
            ))
          }
          </div>
        </div>
      </section>

      <div className='Stats'>
        <h2>Stats Base</h2>
        {
          pokemon.stats?.map((stat) => (
            
             <div key={stat.stat.url}>
              <b>{stat.stat.name}: </b> <div className='Stats1'><div style={{width:`${stateColor(stat.base_stat)}%`}} className='Stats2'> {stat.base_stat} /150</div></div>
            </div>
            
          ))
        }
      </div>

      <section className='movementsContainer'>
        <h2>Movements</h2>
        <div className='movementsCard'>
        {
          pokemon.moves?.map((move) => (
            <p key={move.move.url}>{move.move.name}</p>
          ))
        }
        </div>
      </section>

    </section>

  );
};

export default PokemonsDetail;