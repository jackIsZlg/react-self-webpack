import React from 'react';
import ReactDom from 'react-dom';
import Server from '@/config/axios';
import App from './App'
import './index.less';

React.$axios = Server;
ReactDom.render(<App />, document.getElementById('root'));