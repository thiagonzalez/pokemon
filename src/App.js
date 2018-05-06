import React, { Component } from 'react';
import PokemonList from './components/PokemonList';
import Loading from './components/Loading';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      offset: 0,
      limit: 20,
      total: 0,
      isLoading: true,
      error: null
    }

    const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit={this.state.limit}&offset={this.state.offset}";

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if(data.results) {
          this.setState({ 
            pokemons: data.results,
            total: data.count,
            isLoading: false
          });
        }
      });
  }

  componentDidMount(){
    this.nameInput.focus();
  }

  render() {
    const { isLoading, pokemons } = this.state;

    return (
      <div className="App">
        <header>
          <h1>Pokedex</h1>
          <input 
            className="text"
            ref={(input) => { this.nameInput = input }} 
            placeholder="Search for a pokemon"
          />
        </header>

        <div className="container">
          {isLoading ? <Loading /> : <PokemonList pokemons={pokemons} />}
        </div>
      </div>
    );
  }
}

export default App;
