import React, { Component } from 'react';
import loader from '../images/loader.svg';

class PokemonListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: {
        front_default: loader
      }
    }

    fetch(this.props.pokemon.url)
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          id: data.id,
          images: data.sprites
        });
      });
  }

  render() {
    const pokemon = this.props.pokemon;
    const pokemonDetails = this.state;

    return(
      <div className="pokemon-list-item">
        <a href="">
          <div className="pokemon-image">
            <img src={pokemonDetails.images.front_default} alt={pokemon.name} />
          </div>
          <span className="pokemon-id">{pokemonDetails.id}</span>
          <h2 className="pokemon-name">{pokemon.name}</h2>
        </a>
      </div>
    );
  }
}

export default PokemonListItem;
