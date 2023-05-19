import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { AppHeader } from '../AppHeader';

describe('AppHeader', () => {
  it('match snapshot', () => {
    const appHeader = renderer.create(<AppHeader />).toJSON();
    expect(appHeader).toMatchSnapshot();
  });

  it('renders title text', () => {
    const { getByText } = render(<AppHeader />);

    const titleEl = getByText(/Meu Time/);
    expect(titleEl).toBeInTheDocument();
  });

  it('renders api key', () => {
    const { getByText } = render(<AppHeader />);

    const apiKeyTextEl = getByText(/Sua API Key/);
    expect(apiKeyTextEl).toBeInTheDocument();
  });

  it('renders logout button', () => {
    const { getByRole } = render(<AppHeader />);

    const buttonEl = getByRole('button');
    expect(buttonEl).toBeInTheDocument();
  });
})