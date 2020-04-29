import axios from 'axios';
import store from '@/store';
import qs from 'qs';

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '/api';
// axios.defaults.withCredentials = true; //是否携带cookies发起请求
// axios.defaults.responseType = 'json';

axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data.version = '1.0.0';
        config.data.channel = 3;
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => Promise.reject(error));


axios.interceptors.response.use((res) => res, (error) => Promise.reject(error));


/**
 * 主要params参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
 */

class Server {
    axios(method, url, params) {
        return new Promise((resolve, reject) => {
            if (typeof params !== 'object') params = {};
            let showError = true;
            if (params.showError === false) {
                showError = false;
            }
            // 配置showError为false时，不参与统一报错
            delete params.showError;
            const _option = {
                method,
                url,
                timeout: 30000,
                params: null,
                data: params,
                ...params
            };
            axios.request(_option).then(res => {
                // 默认统一报错
                if (showError && res.data.code != 0) {
                    store.dispatch({
                        type: 'RequestError',
                        result: {
                            showError,
                            ...res
                        }
                    });
                    // reject(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
                    // return;
                }
                resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data));
            }, error => {
                if (error.response) {
                    reject(error.response.data);
                } else {
                    reject(error);
                }
            });
        });
    }
}


export default new Server();
