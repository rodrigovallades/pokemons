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
    this.props.getDetails(params)
  }

  componentWillReceiveProps(props){
    this.setState((prevState, props) => ({
      details: props.details
    }));
  }

  renderDetails() {
    if (!this.state.details) {
      return (
        <p>No details found.</p>
      )
    }
    return (
      <div className="pokemon__details">
        <p className="mb-1">{this.state.details.name}</p>
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
          <h1 className="title"><span className="float-right"><small><Link to="/pokemons">&lt; pokemons</Link></small></span> {this.state.pokemon} <small className="text-muted">details</small></h1>
          <div className='list-group pokemon'>
            {this.renderDetails()}
          </div>
          <Alert bsStyle="info">
            <Octicon name="info"/> Tip: Download the <strong><a href="https://github.com/zalmoxisus/redux-devtools-extension" target="_blnk">Redux DevTools</a></strong> to inspect the Redux store state.
          </Alert>
        </Grid>
      </div>
    )
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
