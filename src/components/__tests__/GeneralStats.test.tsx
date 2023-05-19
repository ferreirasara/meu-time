import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { GeneralStats } from '../GeneralStats';
import { GeneralStatsProps } from '../../@types/types';

const props: GeneralStatsProps = {
  selectedLeague: 0,
  selectedSeason: 0,
  selectedTeam: 0,
  handleError: jest.fn(),
}

describe('GeneralStats', () => {
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
    const generaLStats = renderer.create(<GeneralStats {...props} />).toJSON();
    expect(generaLStats).toMatchSnapshot();
  });

  it('renders stats list', () => {
    const { getByText } = render(<GeneralStats {...props} />);

    const mostUsedFormationEl = getByText(/Formação mais utilizada/);
    expect(mostUsedFormationEl).toBeInTheDocument();

    const totalPlayedEl = getByText(/Total de jogos/);
    expect(totalPlayedEl).toBeInTheDocument();

    const totalWinsEl = getByText(/Total de vitórias/);
    expect(totalWinsEl).toBeInTheDocument();

    const totalLosesEl = getByText(/Total de derrotas/);
    expect(totalLosesEl).toBeInTheDocument();

    const totalDraws = getByText(/Total de empates/);
    expect(totalDraws).toBeInTheDocument();
  });

  it('renders canvas chart', () => {
    const { getByTestId } = render(<GeneralStats {...props} />);

    const chartEl = getByTestId('goals-chart');
    expect(chartEl).toBeInTheDocument();
  });
})