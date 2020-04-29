import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCount, delCount } from '@/store/sync/action';

import S from './index.m.less';

class Home extends Component {
    componentDidMount() {
        this.getData();
    }
    
    async getData() {
        // showError为false的时候就自己来处理错误
        const data = await React.$axios('post', 'http://122.51.66.155:3000/post/user', { showError: false });
        const list = await React.$axios('GET', 'http://122.51.66.155:3000/list');
    }

    render() {
        const { count, addCount1, delCount1 } = this.props;
        return (
            <div className={S.home}>
                home
                <div className={S.num}>
                    当前统计到的数值：
                    {count}
                </div>
                <button className={S.button} onClick={addCount1}>增加</button>
                <button className={S.button} onClick={delCount1}>删除</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    count: state.reducer.count,
    items: state.todos
});

const mapDispatchToProps = (dispatch) => ({
    addCount1: () => {
        dispatch(addCount());
    },
    delCount1: () => {
        dispatch(delCount());
    },
    // delExact: (parmas) => {
    //     dispatch(delExact(parmas))
    // },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
