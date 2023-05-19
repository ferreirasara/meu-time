import renderer from 'react-test-renderer';
import { InfoModal } from '../InfoModal';
import { InfoModalProps } from '../../@types/types';
import ReactDOM from 'react-dom';

const props: InfoModalProps = {
  infoModalOpen: true,
  onClose: jest.fn(),
}

describe('InfoModal', () => {
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element
    })
  })

  afterEach(() => {
    // @ts-ignore
    ReactDOM.createPortal.mockClear()
  })

  it('match snapshot', () => {
    const infoModal = renderer.create(<InfoModal {...props} />).toJSON();
    expect(infoModal).toMatchSnapshot();
  });
})