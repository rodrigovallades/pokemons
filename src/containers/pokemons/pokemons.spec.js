import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import { Pokemons } from './index'

describe('Pokemons container', function () {
  beforeEach(function() {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
  });

  it('renders "Pokemons" deep correctly', () => {
    const tree = renderer.create(<Pokemons/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders "Pokemons" shallow correctly', () => {
    const component = shallow(<Pokemons/>);
    expect(component.exists()).toEqual(true);
  });

})
