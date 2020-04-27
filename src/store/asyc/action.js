import * as type from './action-type';
import Server from '../../config/axios'

// *****************其中一种模式使用自定义的axios请求处理**********************
// 等待一段时间执行
export const waitRun = () => {
    return async dispatch => {
        dispatch({type: type.WaitBegin});
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(1);
            }, 2000)
        });
        let item = await Server.axios('GET','/get');
        console.log(item);
        dispatch({type: type.WaitEnd, item: item});
    }
}

// *****************使用异步加载Middleware，但是最好请求一个接口，数据会被覆盖**********************
export function getLyricInfo() {
    return {
        types: [type.RequestLoad, type.RequestResult, type.RequestError],
        //showError: false, // 是否错误统一处理
        promise: client => client.get(`/lyric`),
        // promise: client => client.post('/123/post',{
        //     page: 1,
        //     value:10
        // })
    }
}

export function requestClear() {
    return {
        type: type.RequestClear
    }
}

// // 初始化获取商品数据，保存至redux
// export const getProData = () => {
//   // 返回函数，异步dispatch
//   return async dispatch => {
//     try{
//       let result = await API.getProduction();
//       result.map(item => {
//         item.selectStatus = true;
//         item.selectNum = 0;
//         return item;
//       })
//       dispatch({
//         type: pro.GETPRODUCTION,
//         dataList: result,
//       })
//     }catch(err){
//       console.error(err);
//     }
//   }
// }
//
// // 选择商品
// export const togSelectPro = index => {
//   return {
//     type: pro.TOGGLESELECT,
//     index,
//   }
// }




