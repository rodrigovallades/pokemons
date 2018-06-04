import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Alert } from 'react-bootstrap'
import Octicon from 'react-octicon'
import qs from 'query-string'

import { getPokemons } from '../../modules/pokemons'
import { history } from '../../store'
import PokemonCard from '../../components/PokemonCard'
import Loader from '../../components/Loader'

import './pokemons.css'

export class Pokemons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      next: '',
      previous: '',
      from: 0,
      to: 0,
      count: 0
    };
    this.getNext = this.getNext.bind(this);
    this.getPrevious = this.getPrevious.bind(this);
  }

  componentWillMount() {
    this.props.getPokemons()
  }

  componentWillReceiveProps(props){

    this.setState((prevState, props) => {

      const from = props.next ? qs.parse(qs.extract(props.next)).offset - qs.parse(qs.extract(props.next)).limit : props.count - props.pokemons.length,
            to = props.next ? qs.parse(qs.extract(props.next)).offset : props.count;

      return {
        pokemons: props.pokemons,
        next: props.next,
        previous: props.previous,
        from: from,
        to: to,
        count: props.count
      }
    });
  }

  selectPokemon(name) {
    history.push(`/${name}/details`);
  }

  getNext() {
    if (this.props.next) this.props.getPokemons(this.state.next)
  }

  getPrevious() {
    if (this.props.previous) this.props.getPokemons(this.state.previous)    
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
          {(this.state.previous || this.state.next) && (
            <ul className="pagination justify-content-center">
              <li className={ this.state.previous ? "page-item" : "disabled page-item" } onClick={this.getPrevious}>
                <span className="page-link">&laquo; Previous</span>
              </li>
              <li className="page-item disabled">
                <span className="page-link">{this.state.from} to {this.state.to} of {this.state.count}</span>
              </li>
              <li className={ this.state.next ? "page-item" : "disabled page-item" } onClick={this.getNext}>
                <span className="page-link">Next &raquo;</span>
              </li>
            </ul>
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
  next: state.pokemons.next,
  previous: state.pokemons.previous,
  loading: state.pokemons.loading,
  count: state.pokemons.count
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPokemons
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokemons);
