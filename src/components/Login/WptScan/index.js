/* eslint-disable react/no-unused-state */
import React, { Component, useEffect, useRef, useState } from 'react';

import QRCode from '../Util/qrcode';
import { handleAjax } from '../Util/handleApi'; // 为了多端复用

import { usePCWS } from './AppScan';

// import { gotoWxLogin, showLogin } from '../index';
import S from './index.m.less';

function WptScan(props) {
    const { scb } = props;
    const [key, setKey] = useState('');
    const [enter, setEnter] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const qrCode = useRef('');
    // const img = usePCImg({ key });
    const [img, status, code, scanType] = usePCWS({ key }); // New（新创建），Checked（已扫码），Confirm（已确认), Expired（已过期）

    // 刷新二维码
    const refreshCode = () => {
        setKey(new Date().getTime());
    };

    // 刷新二维码
    const showQrCode = (reqdata) => {
        const getImg = document.getElementById('QRCode')?.getElementsByTagName('img') || []
        getImg[0] && getImg[0].remove();
        // eslint-disable-next-line no-undef
        qrCode.current &&
            // eslint-disable-next-line no-undef
            new QRCode(qrCode.current, {
                width: 160,
                height: 160,
                text: reqdata,
            });
    };

    useEffect(() => {
        if (img && status !== 'Confirm') {
            showQrCode(img);
        }
        if (status === 'Expired') {
            setEnter(false);
        }
    }, [img, status, enter]);

    useEffect(() => {
        const qrLogin = async (code) => {
            const url = '/wechat/v1.0/qrlogin/login';
            const res = await handleAjax(url, 'post', { code });
            if (res.code !== 0) {
                refreshCode();
                setErrorMsg(res.msg)
                setTimeout(() => {
                    setErrorMsg('')
                }, 2000)
            } else {
                scb && scb(scanType);
                // WPT.Modal.tips('登录成功');
                document.getElementById('wptLogin')?.remove()
            }
        }
        if (status === 'Confirm') {
            // qrLogin(code);
            refreshCode();
            setErrorMsg('hahhahahahahahhahah')
            setTimeout(() => {
                setErrorMsg('')
            }, 2000)
        }
    }, [status, code, scb]);

    const mouseEnter = () => {
        setEnter(true);
    }

    const mouseLeave = () => {
        setEnter(false);
    }

    const renderTip = () => {
        if (errorMsg) {
            return <div className={S.errorTip}>{errorMsg}</div>
        }
        return null;
    }

    const renderContent = () => {
        if (enter) {
            return (
                <div className={S.helpCn} key={enter}>
                    <div className={S.helpImg}/>
                    <div className={S.helpScan} />
                </div>
            )
        } else {
            return (
                <div className={S.QrCn}>
                    <div className={S.QRcode} id="QRCode" ref={qrCode}>
                        <div className={S.logo} />
                        {status === 'Expired' && (
                            <div className={S.hasOut}>
                                <p className={S.outTip}>二维码已失效</p>
                                <p className={S.refresh} onClick={refreshCode}>
                                    刷新二维码
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
    }

    if (status === 'New' || status === 'Expired') {
        return (
            <div className={S.pcLogin}>
                <div className={S.title}>扫码登录</div>
                <div className={S.content}>
                    <span>同时支持</span>
                    <span className={S.text}>微拍堂APP</span>
                    <span>和</span>
                    <span className={S.text}>微信</span>
                    <span>扫码</span>
                </div>

                { renderTip() }
                { renderContent() }

                {
                    status !== 'Expired' && (
                        <div className={S.help} style={ enter ? { color: 'rgba(0, 0, 0, 0.85)' } : {}}>
                            <span onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>使用帮助</span>
                        </div>
                    )
                }
            </div>
        );
    }

    if (status === 'Checked') {
        return (
            <div className={S.pcLogin} key={status}>
                <div className={S.avatar} />
                <div className={S.scanContent}>
                    <p className={S.scanSuccess}>扫码成功</p>
                    <p className={S.scanTip}>请勿刷新页面，按手机提示操作</p>
                </div>
                { renderTip() }
            </div>
        );
    }

    return null;
}

export default class AppScan extends Component {
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

    state = {
        showUserinfo: false,
        imgUrl: '',
        hasOut: false, // 过期
    };

    render() {
        const { scb, fcb, ccb, options } = this.props;
        return (
            <div>
                <WptScan scb={scb} fcb={fcb} ccb={ccb} options={options} />
            </div>
        );
    }
}