import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import { Details } from './index'

jest.mock('react-router-dom', () => ({ Link: 'Link' }))

describe('Details container', function () {
  beforeEach(function() {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
  });

  it('renders "Details" deep correctly', () => {
    const tree = renderer.create(<Details/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders "Details" shallow correctly', () => {
    const component = shallow(<Details/>);
    expect(component.exists()).toEqual(true);
  });

})
