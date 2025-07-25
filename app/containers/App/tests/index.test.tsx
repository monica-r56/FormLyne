// import { render } from '@testing-library/react';
import { render } from '@utils/testHelpers';
import App from '..';

describe('App Component', () => {
  it.skip('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<App />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
