import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from './Button';

configure({ adapter: new Adapter() });

describe('<Button />', () => {
  let wrapper, clickSpy;
  beforeEach(() => {
    clickSpy = jest.fn();
    wrapper = shallow(<Button clicked={clickSpy} />);
  });

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('adds active class when property active is sent', () => {
    wrapper.setProps({ active: true });
    expect(wrapper.find('.Active')).toHaveLength(1);
  });

  it('triggers update method when clicked', () => {
    wrapper.find('button').simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });
});
