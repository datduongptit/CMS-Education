import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/index.css';
import 'antd/dist/antd.css';
import store from '../src/store/store';
import { Provider } from 'react-redux';
import App from './App';

import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
// ReactDOM.render(<LoginPage />, document.getElementById('root'));

serviceWorker.unregister();
