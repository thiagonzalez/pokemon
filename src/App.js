import React, { Component } from 'react';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import Loading from './components/Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleFetchApi = this.handleFetchApi.bind(this);

    this.state = {
      pokemons: [],
      total: undefined,
      nextPage: 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0',
      isLoading: true,
      hasMore: true
    }

    this.handleFetchApi();
  }

  handleFetchApi() {
    if (this.state.pokemons.length >= this.state.total) {
      this.setState({ hasMore: false });
      return;
    }

    fetch(this.state.nextPage)
      .then(response => response.json())
      .then(data => {
        if(data.results) {
          this.setState({ 
            pokemons: this.state.pokemons.concat(data.results),
            total: data.count,
            isLoading: false,
            nextPage: data.next
          });
        }
      });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="App">
        <Header />

        <div className="container">
          {isLoading ? <Loading /> : <PokemonList {...this.state} fetchApi={this.handleFetchApi} />}
        </div>
      </div>
    );
  }
}

export default App;
