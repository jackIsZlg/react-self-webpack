import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as sync from './sync/reducer'; // 同步store
import * as asyc from './asyc/reducer'; // 异步store
import promiseMiddleware from './middleware/promiseMiddleware';
import logger from './middleware/logger';

const store = createStore(
    combineReducers({ ...sync, ...asyc }),
    applyMiddleware(thunk, promiseMiddleware),
);

export default store;
