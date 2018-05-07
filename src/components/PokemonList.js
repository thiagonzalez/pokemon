import React, { Component } from 'react';
import PokemonListItem from './PokemonListItem';
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from './Loading';

class PokemonList extends Component {
  fetchMoreData = () => {
    this.props.fetchApi();
  }

  render() {
    const { pokemons, hasMore } = this.props;

    return(
      <div className="pokemon-list">
        <InfiniteScroll
            dataLength={pokemons.length}
            next={this.fetchMoreData.bind(this)}
            hasMore={hasMore}
            loader={<Loading />}
          >
            {pokemons.map((pokemon, index) => (
              <PokemonListItem key={index} pokemon={pokemon} />
            ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default PokemonList;
