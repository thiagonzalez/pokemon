import React, { Component } from 'react';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import Loading from './components/Loading';
import PokemonDetails from './components/PokemonDetails';
import Modal from 'react-responsive-modal';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-28198042-3');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  constructor(props) {
    super(props);
    this.handleFetchApi = this.handleFetchApi.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);

    this.state = {
      pokemons: [],
      total: undefined,
      nextPage: 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0',
      isLoading: true,
      hasMore: true,
      openModal: false,
      pokemonClicked: null
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

  onOpenModal = (id) => {
    this.setState({ 
      openModal: true,
      pokemonClicked: id
    });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { isLoading, openModal, pokemonClicked } = this.state;

    return (
      <div className="App">
        <Header />

        <div className="container">
          {isLoading ? <Loading /> : <PokemonList {...this.state} fetchApi={this.handleFetchApi} openModal={this.onOpenModal} />}
        </div>

        <Modal open={openModal} onClose={this.onCloseModal} classNames={{ modal: 'modal' }} center>
          <PokemonDetails pokemonClicked={pokemonClicked} />
        </Modal>
      </div>
    );
  }
}

export default App;
