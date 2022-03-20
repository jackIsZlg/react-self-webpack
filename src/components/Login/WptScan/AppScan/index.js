import { useEffect, useRef, useState } from 'react';

import { handleAjax } from '../../Util/handleApi'; // 为了多端复用
import { getSocket } from '../../socket';

export function usePCImg({ key = '' }) {
    const [img, setImg] = useState(''); // 获取图片信息

    const getImg = async () => {
        const url = '/wechat/v1.0/qrlogin/token';
        const res = await handleAjax(url, 'post', {});
        if (res.code == 0) {
            setImg(res.data.img);
        }
    };

    useEffect(() => {
        getImg();
    }, [key]);

    return img;
}

function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

// 获取扫码端自定义hook
export function usePCWS({ key }) {
    const [status, setStatus] = useState('New'); // New（新创建），Checked（已扫码），Confirm（已确认), Expired（已过期）, Canceled (取消登陆)
    const [code, setCode] = useState(''); // 登录二维码中的token信息
    const [wsOpen, setWsOpen] = useState('');
    const [res, setRes] = useState({});
    const [scanType, setScanType] = useState(''); // 后端返回扫码类型， app扫码或者微信扫码
    const [nowTime, setNowTime] = useState('');
    const [img, setImg] = useState(''); // 获取图片信息

    const prvCode = usePrevious(code);

    const getImg = async () => {
        const url = '/wechat/v1.0/qrlogin/token';
        const res = await handleAjax(url, 'post', {});
        if (res.code === 0) {
            setImg(res.data.img);
            setCode(res.data.code);
            setStatus('New');
        }
    };

    useEffect(() => {
        getImg();
    }, [key]);

    useEffect(() => {
        const openSub = getSocket().listen('open', () => {
            setWsOpen('connect');
        });

        const messSub = getSocket().onMessage('pc_qr_login', (val) => {
            if (val?.data) {
                setRes(() => val);
            }
        });

        const closeSub = getSocket().listen('close', () => {
            setWsOpen('disConnct');
            openSub && openSub();
            messSub && messSub();
            closeSub && closeSub();
        });

        return () => {
            openSub && openSub();
            messSub && messSub();
            closeSub && closeSub();
        };
    }, []);

    // 长连接返回的code与当前的刷新的图片code一致时更新status
    useEffect(() => {
        if (res && res?.data?.code === code) {
            setStatus(() => res.data.status);
            if (res.data.status === 'Confirm') {
                setScanType(() => res.data?.scanType || '')
            }
        }
    }, [code, res]);

    // 点击取消登陆以后，重新更新二维码code
    useEffect(() => {
        if (status === 'Canceled') {
            getImg();
        }
    }, [status]);

    // 只依赖wsOpen、code、nowTime，nowTime用来做轮训
    useEffect(() => {
        //  当webSocket断开后，就用轮训
        if (status !== 'Confirm' && wsOpen === 'disConnct') {
            // 已经过期或者取消登陆状态，并且上次的code跟最新的code不一致时，说明code变了，直接刷新状态为New
            if ((status === 'Expired' || status === 'Canceled') && prvCode !== code) {
                setStatus(() => 'New');
            }
            
            let time = setTimeout(async () => {
                const url = '/wechat/v1.0/qrlogin/token-state';
                const res = await handleAjax(url, 'post', { token: code });
                if (res.code === 0) {
                    if (res.data.status === 'Confirm' || res.data.status === 'Expired') {
                        setStatus(() => res.data.status);
                        setScanType(() => res.data?.scanType || '')
                        clearTimeout(time);
                    } else {
                        setStatus(() => res.data.status);
                        setNowTime(() => res.nowTime);
                    }
                } else {
                    clearTimeout(time);
                }
            }, 5000);

            // 已过期的状态跟之前的code一样，取消定时
            if (status === 'Canceled' && prvCode === code) {
                clearTimeout(time);
            }
        }
    }, [wsOpen, code, nowTime]);

    return [img, status, code, scanType];
}
