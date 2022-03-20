import React, { Component } from 'react';

import WptScan from './WptScan';
import { initWs, initWsExit, getSocket } from './socket';

import S from  './css/index.m.less';

export default class PCLogin extends Component {
    static defaultProps = {
        // 成功回调
        scb: () => {},
        // 失败回调
        fcb: () => {},
        // 用户关闭窗口回调
        ccb: () => {},
        // 接口请求参数列表
        options: [],
    };

    render() {
        const { scb, fcb, ccb, options } = this.props;
        return (
            <div>
                <WptScan
                    scb={scb}
                    fcb={fcb}
                    ccb={ccb}
                    options={options}
                />
            </div>
        )
    }
}

class PCShowLogin extends Component {
    static defaultProps = {
        // 成功回调
        scb: () => {},
        // 失败回调
        fcb: () => {},
        // 用户关闭窗口回调
        ccb: () => {},
        // 退出回调
        ecb: () => {},
        // 接口请求参数列表
        options: [],
        // socket实例
        socket: null,
        // 测试\生产环境判断，默认测试环境
        mode: 'development',
        // 是否需要切换前后台自动断开ws
        autoPause: false,
        // 参数
        sys: '',
    };

    constructor(props) {
        super(props);

        const { mode, socket, autoPause, sys } = props;

        // 初始化ws，支持外部传入ws
        initWs({
            mode,
            socket,
            autoPause,
            sys
        });
    }

    render() {
        const { scb, fcb, ccb, ecb, options } = this.props;
        return (
            <div className={S.pcLoginLayer}>
                <div className={S.login}>
                    <PCLogin
                        scb={scb}
                        fcb={fcb}
                        ccb={ccb}
                        ecb={ecb}
                        options={options}
                    />
                </div>
            </div>
        )
    }
}

export { initWs, initWsExit, getSocket, PCShowLogin }
