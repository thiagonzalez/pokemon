import React, { Component } from 'react';
import PokemonList from './components/PokemonList';
import Loading from './components/Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleFetchApi = this.handleFetchApi.bind(this);

    this.state = {
      pokemons: [],
      total: 0,
      nextPage: 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0',
      isLoading: true,
    }

    this.handleFetchApi();
  }

  handleFetchApi() {
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

        console.log(this.state.nextPage);
      });
  }

  componentDidMount(){
    this.nameInput.focus();
  }

  render() {
    const { isLoading } = this.state;

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
          {isLoading ? <Loading /> : <PokemonList {...this.state} fetchApi={this.handleFetchApi} />}
        </div>
      </div>
    );
  }
}

export default App;
