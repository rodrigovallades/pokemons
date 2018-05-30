import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import constants from '../constants/details.constants';
import reducer, { getDetails, initialState } from './details'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Details action creators', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('dispatches the correct actions on successful fetch request', () => {
    fetch.mockResponse(JSON.stringify({ name: 'pokemon1'}))

    const expectedActions = [
      { type: constants.DETAILS_REQUEST, params: { pokemon: 'bulbasaur'}},
      { type: constants.DETAILS_SUCCESS, details: {name: 'pokemon1'} }
    ]
    const store = mockStore(initialState)
    return (
      store
        .dispatch(getDetails({pokemon: 'bulbasaur'}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    )
  })
})

describe('Details reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it(`should handle ${constants.DETAILS_REQUEST}`, () => {
    expect(
      reducer({}, {
        type: constants.DETAILS_REQUEST,
        details: {},
      })
    ).toEqual(
      {
        details: {},
        loading: true,
      }
    )
  })
  it(`should handle ${constants.DETAILS_SUCCESS}`, () => {
    expect(
      reducer({}, {
        type: constants.DETAILS_SUCCESS,
        details: { name: 'pokemon1'},
      })
    ).toEqual(
      {
        details: { name: 'pokemon1'},
        loading: false,
      }
    )
  })
  it(`should handle ${constants.DETAILS_FAILURE}`, () => {
    expect(
      reducer({}, {
        type: constants.DETAILS_FAILURE
      })
    ).toEqual(
      {
        details: {},
        loading: false,
      }
    )
  })
})
