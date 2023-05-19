import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { PlayersTable } from '../PlayersTable';
import { PlayersTableProps } from '../../@types/types';

const props: PlayersTableProps = {
  selectedLeague: 0,
  selectedSeason: 0,
  selectedTeam: 0,
  handleError: jest.fn(),
}

describe('PlayersTable', () => {
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
    const login = renderer.create(<PlayersTable {...props} />).toJSON();
    expect(login).toMatchSnapshot();
  });

  it('renders table', () => {
    const { getByRole } = render(<PlayersTable {...props} />);

    const tableEl = getByRole("table");
    expect(tableEl).toBeInTheDocument();
  });

  it('renders all colunms', () => {
    const { getByText } = render(<PlayersTable {...props} />);

    const nameColunm = getByText(/Nome/);
    expect(nameColunm).toBeInTheDocument();

    const ageColunm = getByText(/Idade/);
    expect(ageColunm).toBeInTheDocument();

    const nationalityEl = getByText(/Nacionalidade/);
    expect(nationalityEl).toBeInTheDocument();
  });

  it('renders empty state', () => {
    const { getByText } = render(<PlayersTable {...props} />);

    const emptyEl = getByText(/No data/);
    expect(emptyEl).toBeInTheDocument();
  });
})