import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import pokemons from './pokemons';
import details from './details';

export default combineReducers({
  routing: routerReducer,
  pokemons,
  details,
});
