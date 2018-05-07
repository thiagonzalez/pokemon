import React, { Component } from 'react';
import Loading from './Loading';

class PokemonDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      pokemon: undefined,
      isLoading: true
    }

    const id = this.props.pokemonClicked,
          url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    if (id) {
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ 
          pokemon: data,
          isLoading: false
        })
      );
    }
  }

  render() {
    const { pokemon, isLoading } = this.state;

    if(isLoading) return(<Loading />);

    return(
      <div className="pokemon-details">
        <div className="pokemon-image">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
        </div>
        <span className="pokemon-id">{`#${pokemon.id}`}</span>
        <h2 className="pokemon-name">{pokemon.name}</h2>

        <div className="item">
          <h4>Type</h4>

          {pokemon.types.map((type) => (
            <div key={type.type.name}>{type.type.name}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default PokemonDetails;
