import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import * as serviceWorker from './serviceWorker';
// import * as moment from 'moment';
// require('moment-timezone');

// moment.tz.setDefault('Africa/Cairo');
// moment.updateLocale('en', {
//   week: {
//     dow: 6,
//     doy: 12,
//   },
// });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
