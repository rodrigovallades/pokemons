import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Alert } from 'react-bootstrap'
import Octicon from 'react-octicon'

import { getDetails } from '../../modules/details'
import Loader from '../../components/Loader'

import './details.css'

export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      pokemon: ''
    };
  }

  componentDidMount() {
    const { params } = this.props.match
    this.setState({ pokemon: params.pokemon });
    this.props.getDetails(params);
  }

  componentWillReceiveProps(props){
    this.setState((prevState, props) => ({
      details: props.details
    }));
  }

  renderDetails() {
    if (!this.state.details.name) {
      return (
        <p>No details found.</p>
      )
    }
    return (
      <div className="card pokemon__details">
        <div className="card-body">
          <h5 className="card-title">{this.state.details.name}</h5>
        </div>
        <div className="card-img"><img src={this.state.details.sprites.front_default} alt="front" /> <img src={this.state.details.sprites.back_default} alt="back" /></div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Default character: {String(this.state.details.is_default)}</li>
          <li className="list-group-item">Base experience: {this.state.details.base_experience}</li>
          <li className="list-group-item">Height: {this.state.details.height}</li>
          <li className="list-group-item">Weight: {this.state.details.weight}</li>
          <li className="list-group-item">Abilities: {this.state.details.abilities && this.state.details.abilities.map(a => a.ability.name).join(', ')}</li>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.loading && (
          <Loader />
        )}
        <Grid>
          {this.props.loading && (
            <h1 className="title title--loading">Loading details...</h1>
          )}
          {!this.props.loading && (
            <div>
              <h1 className="title"><span className="float-right"><small><Link to="/pokemons">&lt; pokemons</Link></small></span> {this.state.details.name} <small className="text-muted">details</small></h1>
              <div className='list-group pokemon'>
                {this.renderDetails()}
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

Details.defaultProps = {
  getDetails: function(){},
  match: {
    params: {}
  }
};

const mapStateToProps = state => ({
  details: state.details.details,
  loading: state.details.loading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getDetails
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
