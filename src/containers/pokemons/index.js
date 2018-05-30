import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Alert } from 'react-bootstrap'
import Octicon from 'react-octicon'

import { getPokemons } from '../../modules/pokemons'
import { history } from '../../store'
import PokemonCard from '../../components/PokemonCard'
import Loader from '../../components/Loader'

import './pokemons.css'

export class Pokemons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: []
    };
  }

  componentWillMount() {
    this.props.getPokemons()
  }

  componentWillReceiveProps(props){
    this.setState((prevState, props) => ({
      pokemons: props.pokemons
    }));
  }

  selectPokemon(name) {
    history.push(`/${name}/details`);
  }

  renderPokemons() {
    if (!this.state.pokemons.length) {
      return (
        <p>No pokemons found.</p>
      )
    }

    return this.state.pokemons.map((pokemon, index) => {
      return (
        <PokemonCard
          key={index}
          name={pokemon.name}
          url={pokemon.url}
          onClick={() => this.selectPokemon(pokemon.name)}
        />
      )
    })
  }

  render() {
    return (
      <div>
        {this.props.loading && (
          <Loader />
        )}
        <Grid>
          {this.props.loading && (
            <h1 className="title title--loading">Loading pokemons...</h1>
          )}
          {!this.props.loading && (
            <div>
              <h1 className="title"><span className="badge badge-light">{this.state.pokemons.length}</span> Pokemons</h1>
              <div className='pokemons'>
                {this.renderPokemons()}
              </div>
            </div>
          )}
          <Alert bsStyle="info">
            <Octicon name="info"/> Tip: Download the <strong><a href="https://github.com/zalmoxisus/redux-devtools-extension" target="_blnk">Redux DevTools</a></strong> to inspect the Redux store state.
          </Alert>
        </Grid>
      </div>
    )
  }
};

Pokemons.defaultProps = {
  getPokemons: function(){}  
};

const mapStateToProps = state => ({
  pokemons: state.pokemons.pokemons,
  loading: state.pokemons.loading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPokemons
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokemons);
