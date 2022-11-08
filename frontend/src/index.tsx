import ReactDOM from 'react-dom';
import App from './app';

import * as moment from 'moment';
import 'moment-timezone';

moment.tz.setDefault('Africa/Cairo');
moment.updateLocale('en', {
  week: {
    dow: 6,
    doy: 12,
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
