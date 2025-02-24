import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [pokemonData, setPokemonData] = useState()
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState()
  const [pokemonName, setPokemonName] = useState('')

  // gets the list of the original 151 pokemon
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => setPokemonList(data.results))
      .catch(error => console.error('Error fetching Pokemon list:', error));
  }, [])

  // gets an individual pokemon's data
  useEffect(() => {
    if (!pokemonName) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        setPokemonData(data)
      })
      .catch(error => console.error('Error fetching pokemon:', error));
  }, [pokemonName])

  // gets an individual pokemon species's data
  useEffect(() => {
    if (!pokemonName) return;
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        setPokemonSpeciesData(data)
      })
      .catch(error => console.error('Error fetching pokemon species:', error));
  }, [pokemonName])

  return (
    <>
      {pokemonData && pokemonSpeciesData? (
        // show pokedex entry details
        <div className='pokedex-details'>
          {/* back button */}
          <button onClick={() => setPokemonData(null)}>Return to Pokedex</button>

          <h1 className='pokemon-name'>{pokemonData.name}</h1>
          <p>No. {pokemonData.id}</p>

          {/* genus text */}
          <p className='genus'><em>The {pokemonSpeciesData.genera.find((n) => n.language.name === 'en').genus}</em></p>

          {/* flavor text */}
          <p className='flavor-text'>{pokemonSpeciesData.flavor_text_entries.find((n) => n.language.name === 'en').flavor_text}</p>

          {/* height and weight */}
          <p>Height: {pokemonData.height / 10} m</p>
          <p>Weight: {pokemonData.weight / 10} kg</p>

          {/* types */}
          <p className='pokemon-types'><strong>Type: </strong>{pokemonData.types[0]?.type.name} {pokemonData.types[1]?.type.name}</p>


          {/* base stats */}
          {pokemonData.stats ? (
            <div className='pokemon-stats'>
              <p><strong>Base Stats</strong></p>
              <p>HP: {pokemonData.stats[0]?.base_stat}</p>
              <p>Attack: {pokemonData.stats[1]?.base_stat}</p>
              <p>Defense: {pokemonData.stats[2]?.base_stat}</p>
              <p>Special-Attack: {pokemonData.stats[3]?.base_stat}</p>
              <p>Special-Defense: {pokemonData.stats[4]?.base_stat}</p>
              <p>Speed: {pokemonData.stats[5]?.base_stat}</p>
            </div>
          ) : (
              <div className='loader'></div>
          )}

          {/* moves */}
          <ul className='pokemon-moves'>
            <p><strong>Moves</strong></p>
            {pokemonData.moves.map((move, index) => (
              <li key={index} className='pokemon-move'>{move.move.name}</li>
            ))}
          </ul>


        </div>

      ) : (
        // show full pokedex
        <>
          <h1>Pokedex</h1>
          <div className='pokedex-box'>
            {pokemonList.map((pokemon, index) => (
              <div key={index} className='pokemon-card' onClick={() => {
                setPokemonName(pokemon.name);
              }}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${index + 1}.gif`} />
                <p>#{index + 1} <strong>{pokemon.name}</strong></p>
              </div>
            ))}
          </div>
        </>
      )
      }
    </>
  )
}

export default App
