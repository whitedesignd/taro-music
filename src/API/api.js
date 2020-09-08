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
    getSeachHot(data={})  {  // 热搜接口
        return fetch('/search/hot/detail',data);
    },
    getSearchSuggest(data={}){  //搜索建议接口
        return fetch('/search/suggest',data);
    },
    getBanner(data={}){  //推荐轮播
        return fetch('/banner',data)
    },
    getPersonalized(data={'limit':5}){ //推荐歌单
        return fetch('/personalized',data)
    },
    getRecommend(data={}){  //每日推荐歌曲
        return fetch('/recommend/resource',data)
    },
    getPlaylistHot(data={}){  //热门歌单分类
        return fetch('/playlist/hot',data)
    },
    getPlaylisthigHquality(data={}){  //获取精品歌单
        return fetch('/top/playlist/highquality',data)
    },
    getSongUrl(data={}){  //获取歌曲
        return fetch('/song/url',data)
    },
    getPlaylistDetail(data={}){  //获取歌单不完整详情
        return fetch('/playlist/detail',data)
    },
}

