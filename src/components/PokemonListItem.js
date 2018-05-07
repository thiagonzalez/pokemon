import React, { Component } from 'react';

class PokemonListItem extends Component {
  handleClick(id) {
    this.props.openModal(id);
  }

  render() {
    const pokemon = this.props.pokemon;
    const id = pokemon.url.split('/')[6];
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return(
      <div className="pokemon-list-item">
        <button data-id={id} onClick={this.handleClick.bind(this, id)}>
          <div className="pokemon-image">
            <img src={image} alt={pokemon.name} />
          </div>
          <span className="pokemon-id">{`#${id}`}</span>
          <h2 className="pokemon-name">{pokemon.name}</h2>
        </button>
      </div>
    );
  }
}

export default PokemonListItem;
