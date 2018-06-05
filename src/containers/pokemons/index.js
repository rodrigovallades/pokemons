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
import Pagination from '../../components/Pagination'

import './pokemons.css'

export class Pokemons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      from: 0,
      to: 0
    };
  }

  componentWillMount() {
    if (!this.props.pokemons.length) {
      this.props.getPokemons()
    } else {
      this.updatePagination()
    }
  }

  componentWillReceiveProps(props){
    this.updatePagination()
  }

  updatePagination() {
    this.setState((prevState, props) => {
      const from = props.next ? qs.parse(qs.extract(props.next)).offset - qs.parse(qs.extract(props.next)).limit : props.count - props.pokemons.length,
            to = props.next ? qs.parse(qs.extract(props.next)).offset : props.count;

      return {
        from,
        to
      }
    });
  }

  selectPokemon(name) {
    history.push(`/${name}/details`);
  }

  getNext() {
    if (this.props.next) this.props.getPokemons(this.props.next)
  }

  getPrevious() {
    if (this.props.previous) this.props.getPokemons(this.props.previous)
  }

  renderPokemons() {
    if (!this.props.pokemons.length) {
      return (
        <p className='notfound'>No pokemons found.</p>
      )
    }

    return this.props.pokemons.map((pokemon, index) => {
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

  renderTitle() {
    return this.props.loading ? (<span>Pokemons (loading...)</span>) : (<span>Pokemons</span>)
  }

  render() {
    return (
      <div>
        {this.props.loading && (
          <Loader />
        )}
        <Grid>
          <h1 className="title"><span className="badge badge-light">{this.props.pokemons.length}</span> {this.renderTitle()}</h1>
          {(this.props.previous || this.props.next) && (
            <Pagination previous={this.props.previous} next={this.props.next} from={this.state.from} to={this.state.to} count={this.props.count} getPrevious={() => this.getPrevious()} getNext={() => this.getNext()} />
          )}
          <div className='pokemons'>
            {this.renderPokemons()}
          </div>
          {(this.props.previous || this.props.next) && (
            <Pagination previous={this.props.previous} next={this.props.next} from={this.state.from} to={this.state.to} count={this.props.count} getPrevious={() => this.getPrevious()} getNext={() => this.getNext()} />
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
  getPokemons: function(){},
  pokemons: []
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
