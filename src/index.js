import React from 'react';
import ReactDom from 'react-dom';
import Server from '@/config/axios';
import { Provider } from 'react-redux';
import store from '@/store';
import App from './App';
import './index.less';

React.$axios = Server.axios;
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
