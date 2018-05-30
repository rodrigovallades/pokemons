import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import pokeapi from '../constants/pokeapi.constants';
import constants from '../constants/pokemons.constants';
import reducer, { getPokemons, initialState } from './pokemons'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Pokemons action creators', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls the correct Pokeapi endpoint', () => {
    expect(pokeapi.URL).toEqual('https://pokeapi.co/api/v2/pokemon')
  })

  it('dispatches the correct actions on successful fetch request', () => {
    fetch.mockResponse(JSON.stringify([ { name: 'repo1'} ]))

    const expectedActions = [
      { type: constants.POKEMONS_REQUEST},
      { type: constants.POKEMONS_SUCCESS, pokemons: [{name: 'repo1'}] }
    ]
    const store = mockStore(initialState)
    return (
      store
        .dispatch(getPokemons())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    )
  })
})

describe('Pokemons reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${constants.POKEMONS_REQUEST}`, () => {
    expect(
      reducer({}, {
        type: constants.POKEMONS_REQUEST,
        pokemons: [],
      })
    ).toEqual(
      {
        pokemons: [],
        loading: true,
      }
    )
  })
  it(`should handle ${constants.POKEMONS_SUCCESS}`, () => {
    expect(
      reducer({}, {
        type: constants.POKEMONS_SUCCESS,
        pokemons: { results: [ {name: 'pokemon1'}, {name: 'pokemon2'}]},
      })
    ).toEqual(
      {
        pokemons: [{name: 'pokemon1'}, {name: 'pokemon2'}],
        loading: false,
      }
    )
  })
  it(`should handle ${constants.POKEMONS_FAILURE}`, () => {
    expect(
      reducer({}, {
        type: constants.POKEMONS_FAILURE
      })
    ).toEqual(
      {
        pokemons: [],
        loading: false,
      }
    )
  })
})
