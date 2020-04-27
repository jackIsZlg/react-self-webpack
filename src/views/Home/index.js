import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    addCount,
    addExact,
    delCount,
    delExact,
    addItem
}  from '@/store/sync/action';

import S from './index.m.less';

class Home extends Component {
    render() {
        const { count, addCount, delCount } = this.props;
        return (
            <div className={S.home}>
                home
                <div className={S.num}>
                    当前统计到的数值：{count}
                </div>
                <button onClick={addCount}>增加</button>
                <button onClick={delCount}>删除</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        count: state.reducer.count,
        items: state.todos
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCount: () => {
            dispatch(addCount())
        },
        addExact: (parmas) => {
            dispatch(addExact(parmas))
        },
        delCount: () => {
            dispatch(delCount())
        },
        delExact: (parmas) => {
            dispatch(delExact(parmas))
        },
        addItem: (text) => {
            dispatch(addItem(text))
        },
        showTrue: () => {
            dispatch(delExact())
        },

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

