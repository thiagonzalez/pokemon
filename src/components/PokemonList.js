import React, { Component } from 'react';
import PokemonListItem from './PokemonListItem';

class PokemonList extends Component {
  render() {
    const pokemons = this.props.pokemons;

    return(
      <div className="pokemon-list">
        {pokemons.map(pokemon =>
          <PokemonListItem key={pokemon.url} pokemon={pokemon} />
        )}
      </div>
    );
  }
}

export default PokemonList;
