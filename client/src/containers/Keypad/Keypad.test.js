import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Keypad from './Keypad';
import Button from '../../components/Button/Button';

configure({ adapter: new Adapter() });

describe('<Keypad />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Keypad />);
  });

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders 14 buttons represnting mobile keypad', () => {
    expect(wrapper.find(Button)).toHaveLength(14);
  });
});
