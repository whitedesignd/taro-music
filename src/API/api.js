import Taro from '@tarojs/taro';
const BASE_url = 'http://localhost:10001';
const fetch = (url,data) =>{
    return new Promise((resolve,reject)=>{
        Taro.request({
            url:BASE_url + url,
            data: data,
            header: {
              'content-type': 'application/json',
            },
            success: function (res) {
               resolve(res)
            },
            fail(err){
                reject(err);
            }
        });
    })
}
export default {
    getSeachHot(data={})  {
        return fetch('/search/hot/detail',data);
    },
    getSearchSuggest(data={}){
        return fetch('/search/suggest',data);
    },
    getSeachMultimatch(data={}) {
        return fetch('/search/multimatch',data)
    }
}
