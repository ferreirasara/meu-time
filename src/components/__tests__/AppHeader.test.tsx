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

  it('renders info button', () => {
    const { getByText } = render(<AppHeader />);

    const infoButton = getByText(/Informações/);
    expect(infoButton).toBeInTheDocument();
  });

  it('renders logout button', () => {
    const { getByText } = render(<AppHeader />);

    const buttonEl = getByText(/Sair/);
    expect(buttonEl).toBeInTheDocument();
  });
})