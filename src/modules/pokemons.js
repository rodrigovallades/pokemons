import pokeapi from '../constants/pokeapi.constants';
import constants from '../constants/pokemons.constants';

export const initialState = { pokemons: [], next: '', previous: '', count: 0, loading: false };

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case constants.POKEMONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case constants.POKEMONS_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemons: action.pokemons.results,
        next: action.pokemons.next,
        previous: action.pokemons.previous,
        count: action.pokemons.count
      };
    case constants.POKEMONS_FAILURE:
      return {
        ...state,
        loading: false,
        pokemons: [],
        next: '',
        previous: '',
        count: 0
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

    const fetchURL = params ? params : pokeapi.URL;

    return fetch(`${fetchURL}`)
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
