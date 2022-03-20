const orginUrl = [
    {
        test: 'https://t-gapi.weipaitang.com',
        pro: 'https://gapi.weipaitang.com'
    },
    {
        test: 'https://apit.weipaitang.com',
        pro: 'https://api.weipaitang.com'
    },
]


export function handleAjax(ajaxUrl, type, data, useGapi = 0) {
    let formData = data;
    let url = ajaxUrl;
    const search = Object.keys(data).map((key) => [key, data[key]].map(encodeURIComponent).join('=')).join('&');
    if (type === 'post' || type === 'POST') {
        formData = search;
    } else {
        url = `${ajaxUrl}?${search}`;
        formData = '';
    }

    let orgin = orginUrl[useGapi].pro;
    if (window.location.host === 't.weipaitang.com' || window.location.host === 'shopadmint.weipaitang.com') {
        orgin = orginUrl[useGapi].test;
    }

    return new Promise((resolve, reject) => {

        try {
            // 提交请求
            const xhr = new XMLHttpRequest();

            xhr.open(type, `${orgin}${url}`, false);
            xhr.withCredentials = true;
            // xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

            // xhr.onprogress =  function(event){
            //     console.log(event)
            // }
            xhr.upload.onprogress = (event) => {
                console.warn(`文件上传进度：${event.loaded / event.total}`);
                if (event.lengthComputable) {
                    console.warn('文件上传成功');
                }
            };
            xhr.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        resolve(JSON.parse(this.responseText));
                    } else {
                        reject('请求出错');
                    }
                } else {
                    // reject(this.responseText)
                }
            };
            xhr.send(formData);
            
        } catch(err) {

        }
        

        // $.ajax({
        //     url: `${orgin}${url}`,
        //     type,
        //     cache: false,
        //     data: formData,
        //     processData: false,
        //     contentType: false,
        //     dataType: 'json',
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     beforeSend(xhr) {
        //         try {
        //             xhr.withCredentials = true;
        //         } catch (e) {
        //             const nativeOpen = xhr.open;
        //             xhr.open = function onXhrOpen() {
        //                 // eslint-disable-next-line prefer-rest-params
        //                 const result = nativeOpen.apply(xhr, arguments);
        //                 xhr.withCredentials = true;
        //                 return result;
        //             };
        //         }
        //     },
        //     success(res) {
        //         resolve(res);
        //     },
        //     error() {
        //         reject('请求出错');
        //     },
        // });
    });
}

export function safeDecode(str) {
    try {
        return decodeURIComponent(str);
    } catch (err) {
        console.error(`传入的字符串无法被decode: ${str} `, err);
        return str;
    }
}

export function splitSearchKeyValue(str = '') {
    const [key, ...valueArr] = str.split('=');
    const value = valueArr.length ? valueArr.join('=') : undefined;
    return [key, value].filter((i) => i !== undefined).map(safeDecode);
}


export function query(url = window.location.href) {
    let search = '';
    const obj = {};
    if (typeof search !== 'string') {
        return obj;
    }
    if (url.includes('?')) {
        const a = document.createElement('a');
        a.href = url;
        search = a.search.slice(1);
    } else {
        search = '';
    }
    search.split('&').forEach((i) => {
        const [k, v] = splitSearchKeyValue(i);
        if (k) {
            obj[k] = v;
        }
    });
    return obj;
}

