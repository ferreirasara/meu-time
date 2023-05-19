import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { GoalsChart } from '../GoalsChart';
import { GoalsChartProps } from '../../@types/types';

const props: GoalsChartProps = {
  data: {
    goals: {
      against: {
        minute: {
          "0-15": { percentage: "0%", total: 0 },
          "16-30": { percentage: "0%", total: 0 },
          "31-45": { percentage: "0%", total: 0 },
          "46-60": { percentage: "0%", total: 0 },
          "61-75": { percentage: "0%", total: 0 },
          "76-90": { percentage: "0%", total: 0 },
          "91-105": { percentage: "0%", total: 0 },
          "106-120": { percentage: "0%", total: 0 },
        }
      },
      for: {
        minute: {
          "0-15": { percentage: "0%", total: 0 },
          "16-30": { percentage: "0%", total: 0 },
          "31-45": { percentage: "0%", total: 0 },
          "46-60": { percentage: "0%", total: 0 },
          "61-75": { percentage: "0%", total: 0 },
          "76-90": { percentage: "0%", total: 0 },
          "91-105": { percentage: "0%", total: 0 },
          "106-120": { percentage: "0%", total: 0 },
        }
      },
    },
    mostUsedFormation: { formation: "", played: 0 },
    totalDraws: 0,
    totalLoses: 0,
    totalPlayed: 0,
    totalWins: 0,
  },
  loading: false,
}

describe('GoalsChart', () => {
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
    const goalsChart = renderer.create(<GoalsChart {...props} />).toJSON();
    expect(goalsChart).toMatchSnapshot();
  });

  it('renders canvas chart', () => {
    const { getByTestId } = render(<GoalsChart {...props} />);

    const chartEl = getByTestId('goals-chart');
    expect(chartEl).toBeInTheDocument();
  });
})