import React, { Component } from 'react';
import PokemonListItem from './PokemonListItem';
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from './Loading';

class PokemonList extends Component {
  fetchMoreData = (limit, offset) => {
    // if (this.props.pokemons.length >= this.props.total) {
    //   this.setState({ hasMore: false });
    //   return;
    // }
    this.props.fetchApi();
    console.log('fetch more data!');
  }

  render() {
    const { pokemons, total } = this.props;

    return(
      <div className="pokemon-list">
        <InfiniteScroll
            dataLength={total}
            next={this.fetchMoreData}
            hasMore={true}
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
