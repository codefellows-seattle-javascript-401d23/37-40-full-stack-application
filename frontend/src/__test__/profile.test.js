import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { configure as configureEnzyme, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Profile from '../component/profile/profile';

configureEnzyme({ adapter: new Adapter() });

describe('Profile testing', () => {
  const initialState = {
    clientProfile: {
      firstName: 'Jennifer',
      location: 'Seattle',
    },
  };
  test('Should contain profile form', () => {
    const mockStore = configureStore([]);
    const mountedProfile = mount(<Provider store={mockStore(initialState)}><Profile/></Provider>);

    expect(mountedProfile.find('ProfileForm')).toBeTruthy();
  });
  test('Profile should match initialState', () => {
    const mockStore = configureStore([]);
    const mountedProfile = mount(<Provider store={mockStore(initialState)}><Profile/></Provider>);

    expect(mountedProfile.find('Profile').props().profile).toEqual(initialState.clientProfile);
  });
});
