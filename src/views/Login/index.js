import React, { Component } from 'react';

import Server from '../../config/axios';

// import S from './index.m.less';

import PCLogin, { initWs } from  '../../components/Login/index';

class Login extends Component {
    componentDidMount() {
        initWs({
            mode: 'production'
        })
        Server.axios('post', 'http://10.101.57.55/wechat/v1/invoice/post-address-info')
    }
    

    render() {
        return (
            <div>
                <PCLogin />
            </div>
        )
    }
}


export default Login
