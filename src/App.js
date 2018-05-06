import React, { Component } from 'react';
import PokemonList from './components/PokemonList';
import Loading from './components/Loading';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      isLoading: true,
      error: null
    }

    fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0')
      .then(response => response.json())
      .then(data => {
        if(data.results) {
          this.setState({ 
            pokemons: data.results,
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
