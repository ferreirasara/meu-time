import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { FiltersCard } from '../FiltersCard';
import { FiltersCardProps } from '../../@types/types';

const props: FiltersCardProps = {
  selectedCountry: "",
  handleSelectCountry: jest.fn(),
  selectedLeague: 0,
  handleSelectLeague: jest.fn(),
  selectedSeason: 0,
  handleSelectSeason: jest.fn(),
  selectedTeam: 0,
  handleSelectTeam: jest.fn(),
  localStorageDataLoading: false,
  handleError: jest.fn(),
}

describe('FiltersCard', () => {
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
    const filtersCard = renderer.create(<FiltersCard {...props} />).toJSON();
    expect(filtersCard).toMatchSnapshot();
  });

  it('renders all selectors', () => {
    const { getByTestId } = render(<FiltersCard {...props} />);

    const countrySelector = getByTestId("select-country");
    expect(countrySelector).toBeInTheDocument();

    const leagueSelector = getByTestId("select-league");
    expect(leagueSelector).toBeInTheDocument();

    const seasonSelector = getByTestId("select-season");
    expect(seasonSelector).toBeInTheDocument();

    const teamSelector = getByTestId("select-team");
    expect(teamSelector).toBeInTheDocument();
  });

  it('renders all labels', () => {
    const { getByText } = render(<FiltersCard {...props} />);

    const countryLabel = getByText(/País/, { exact: false });
    expect(countryLabel).toBeInTheDocument();

    const leagueLabel = getByText(/Liga/);
    expect(leagueLabel).toBeInTheDocument();

    const seasonLabel = getByText(/Temporada/);
    expect(seasonLabel).toBeInTheDocument();

    const teamLabel = getByText(/Time/);
    expect(teamLabel).toBeInTheDocument();
  });
})