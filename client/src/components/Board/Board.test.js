import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Board from './Board';

configure({ adapter: new Adapter() });

describe('<Board />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
