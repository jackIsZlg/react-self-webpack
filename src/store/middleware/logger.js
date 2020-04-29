
// redux 中间件例子
export const logger = store => next => action => {
    // console.group(action.type)
    // console.info('dispatching', action)
    const result = next(action);
    // console.log('next state', store.getState())
    return result;
};
