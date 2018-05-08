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

        <div className="center">
          <div className="pokemon-image">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
          </div>
          <span className="pokemon-id">{`#${pokemon.id}`}</span>
          <h2 className="pokemon-name">{pokemon.name}</h2>
        </div>

        <div className="item">
          <h4>Weight</h4>
          <span>{pokemon.weight / 10} kg</span>
        </div>

        <div className="item">
          <h4>Height</h4>
          <span>{pokemon.height / 10} m</span>
        </div>

        <div className="item">
          <h4>Type</h4>

          {pokemon.types.map((type) => (
            <span key={type.type.name} className={`capitalize label label-${type.type.name}`}>{type.type.name}</span>
          ))}
        </div>

        <div className="item">
          <h4>Abilities</h4>

          {pokemon.abilities.map((ability) => (
            <span key={ability.ability.name} className="capitalize comma">
              {ability.ability.name}
              
              {ability.is_hidden &&
                <strong>(hidden ability)</strong>
              }
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default PokemonDetails;
