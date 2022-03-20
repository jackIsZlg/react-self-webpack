import { GlobalWebSocket } from 'wpt-web-socket';

// ws实例
let ws = null;

/**
 * 初始化ws
 * @param {{ socket, mode, autoPause, sys }} param0 
 */
export const initWs = ({
    socket = null,
    mode = 'development',
    autoPause = true,
    sys = '',
} = {}) => {
    if (socket) {
        // 如果有实例传入，直接覆盖
        ws = socket;
    } else {
        ws = new GlobalWebSocket({
            mode,
            sys,
        });
        ws.init();
        autoPause && ws.onAppPause();
    }

    return ws;
}

// PCLink
export const initWsExit = (callback) => {
    if (ws) {
        ws.onMessage('pc_qr_login', (res = {}) => {
            if (res?.data?.status === 'Kick') {
                callback && callback()
            }
        });
    }
}

export const getSocket = () => ws;
