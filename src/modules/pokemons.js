import pokeapi from '../constants/pokeapi.constants';
import constants from '../constants/pokemons.constants';

export const initialState = { pokemons: [], loading: true };

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case constants.POKEMONS_REQUEST:
      return {
        ...state,
        loading: true,
        pokemons: []
      };
    case constants.POKEMONS_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemons: action.pokemons.results
      };
    case constants.POKEMONS_FAILURE:
      return {
        ...state,
        loading: false,
        pokemons: []
      };
    default:
      return state
  }
};

// action creators
export const getPokemons = params => {
  return dispatch => {
    function request(params) { return { type: constants.POKEMONS_REQUEST, params } };
    function success(pokemons) { return { type: constants.POKEMONS_SUCCESS, pokemons } };
    function failure(error) { return { type: constants.POKEMONS_FAILURE, error } };

    dispatch(request(params));

    return fetch(`${pokeapi.URL}`)
      .then(pokemons => {
        pokemons.json().then(pokemons => {
          dispatch(success(pokemons));
        })
      })
      .catch(function(error) {
        console.error(error)
        dispatch(failure(error));
      });
  }
};
