import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Login } from '../Login';

describe('Login', () => {
  beforeAll(() => {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })
  })

  it('match snapshot', () => {
    const login = renderer.create(<Login />).toJSON();
    expect(login).toMatchSnapshot();
  });
})