import { FormattedMessage } from 'react-intl';
import messages from './messages';

const App = () => (
  <div className={'flex h-screen w-screen flex-1 items-center justify-center'}>
    <FormattedMessage {...messages.root_app} />
  </div>
);

export default App;
