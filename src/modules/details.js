import pokeapi from '../constants/pokeapi.constants';
import constants from '../constants/details.constants';
import { history } from '../store'

export const initialState = { details: {}, loading: false };

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case constants.DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        details: {}
      };
    case constants.DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        details: action.details
      };
    case constants.DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        details: {}
      };
    default:
      return state
  }
};

// action creators
export const getDetails = params => {
  return dispatch => {
    function request(params) { return { type: constants.DETAILS_REQUEST, params } };
    function success(details) { return { type: constants.DETAILS_SUCCESS, details } };
    function failure(error) { return { type: constants.DETAILS_FAILURE, error } };

    dispatch(request(params));

    return fetch(`${pokeapi.URL}/${params.pokemon}`)
      .then(details => {
        if (details.status === 404) history.push('/pokemons');        
        details.json().then(details => {
          dispatch(success(details));
        })
      })
      .catch(function(error) {
        console.error(error)
        dispatch(failure(error));
      });
  }
};
