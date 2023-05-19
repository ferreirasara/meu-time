import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Dashboard } from '../Dashboard';

describe('Dashboard', () => {
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
    const dashboard = renderer.create(<Dashboard />).toJSON();
    expect(dashboard).toMatchSnapshot();
  });

  it('renders empty text', () => {
    const { getByText } = render(<Dashboard />);

    const emptyEl = getByText(/Selecione um time utilizando os filtros acima./);
    expect(emptyEl).toBeInTheDocument();
  });
})