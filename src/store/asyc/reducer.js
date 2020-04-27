import * as type from "../asyc/action-type";

export function waitFun(state = {}, action) {
    switch (action.type) {
        case type.WaitRun:
            return state;
        case type.WaitBegin:
            return {
                status: 'begin'
            };
        case type.WaitEnd:
            return {
                status: 'end',
                item: action.item
            };
        default:
            return state
    }
}

const initReq = {
    isLoading: false,
    userInfo: {},
    errorMsg: ''
}

// 获取接口信息
export function getAjaxInfo(state = initReq, action) {
    switch (action.type) {
        case type.RequestLoad:
            return {
                ...state,
                isLoading: true,
                userInfo: {},
                errorMsg: '',
                code: 0
            };
        case type.RequestResult:
            return {
                ...state,
                isLoading: false,
                userInfo: action.result.data,
                errorMsg: '',
                code: 0
            };
        case type.RequestError:
            return {
                ...state,
                isLoading: false,
                showError: action.result.showError, // 默认统一报错处理
                userInfo: action.result.data,
                errorMsg: action.result.data.msg ? action.result.data.msg : '请求错误',
                code: action.result.data.code ? action.result.data.code : 9998
            };
        case type.RequestClear:
            return {
                ...state,
                isLoading: false,
                userInfo:{},
                errorMsg: "clear",
                code: 0
            }
        default:
            return state;
    }
}


