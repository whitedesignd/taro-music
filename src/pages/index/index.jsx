import React, { Component } from 'react'
import { AtIcon, AtDrawer } from 'taro-ui'
import Taro from '@tarojs/taro';
import './index.less'
import 'taro-ui/dist/style/index.scss'
import API from '../../API/api';
import { connect} from 'react-redux';
const mapStateToProps =(store) =>{
  return {
    hotTags: store.hotTags
  }
}
class Index extends Component {
  state = {
    seachValue: '',
    atDrawerShow: false,
    currentSwiper: 0,
    banner: [],
    icon: [
      {
        class: 'iconmeirituijian',
        to:'1',
        title:'每日推荐'
      },
      {
        class: 'iconpaihangbang',
        to:'',
        title:'排行榜'
      }, 
      {
        class: 'icongedan',
        to:'',
        title:'歌单'
      },
      {
        class: 'icondiantai',
        to:'',
        title:'电台'
      }
    ],
    personalized:[],

  }
  componentWillMount() { }

  componentDidMount() {
    console.log(this.props);
    API.getBanner().then(res => {
      let { statusCode, data } = res;
      if (statusCode == 200) {
        this.setState({ banner: data.banners });
      }
      
    });
    API.getPersonalized().then(res=>{
      let {statusCode,data} = res;
      if (statusCode == 200) {
        this.setState({ personalized: data.result});
      }
    })
    API.getPlaylistHot().then(res=>{
      let tags = res.data.tags;

      API.getPlaylisthigHquality({'cat':tags[0].name,'limit':5}).then(res=>{
        console.log(res);
        API.getPlaylistDetail({'id':res.data.playlists[0].id}).then(res=>{
          console.log(res);
          // 不完整
          let tracks = res.data.playlist.tracks;
          let ids = [];
          for(let i = 0; i< 9;i++){
              ids.push(tracks[i].id);
          }
          console.log(ids.join(',').toString());
          API.getSongUrl({'id':ids.join(',')}).then(res=>{
            console.log(res);
          })
        })
      })
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 下拉刷新
  onPullDownRefresh() {
    this.componentDidMount();
    Taro.stopPullDownRefresh ();
  }
  //单位换算
  Convert(num){
    let arr = String(num).split('');
    if(arr.length > 4 && arr.length <9){
      return arr.splice(0,arr.length-4).join('') + '万';
    }
    if( arr.length >8){
      return arr.splice(0,arr.length-8).join('') + '亿';
    }
  }
  // 搜索页面跳转
  searchClick(e) {
    Taro.navigateTo({ url: "/pages/seach/seach" })
  }
  //抽屉页面显示
  drawerShow() {
    this.setState({ atDrawerShow: true })
  }
  render() {
    return (
      <view className='index' onTouchStart={(e) => { }}>
        <view className="header">
          <AtIcon value='bullet-list'
            size='25px'
            onClick={this.drawerShow.bind(this)}>
          </AtIcon>
          <view className="header-tabar">
            <view >我的</view>
            <view class='tabbar-selected'>发现</view >
            <view >视频</view>
          </view>
          <AtIcon value='search' size='25px' onClick={this.searchClick.bind(this)}></AtIcon>
        </view>
        <swiper className='swiper' indicatorColor='#e4e0e0'
          indicatorActiveColor='#f51e1e'
          circular
          indicatorDots
          autoplay
        >
          {
            this.state.banner && this.state.banner.map(v => {
              return <swiper-item>
                  <image lazy-load src={v.imageUrl}></image>
                </swiper-item>
              }
            )
          }
        </swiper>
        <view className="icon">
          {
            this.state.icon.map(v =>(
              <icon-font iconClass={v.class} to={v.to} title={v.title}>
                <text className='title' style={{fontSize:'25rpx',paddingTop: '1vh'}}>{v.title}</text>
              </icon-font>
            ))
          }
          
        </view>

        <view className="personalized">
          <view className='title'>
            <view className='order-0'>
              人气歌单推荐 
            </view>
            <view className='order-1'>
              <icon-font iconClass='iconhuan'
                  styles='background-color:#fff;font-size: 30rpx;'
                  iconStyle='color:#aaa'>
              </icon-font>
              <view>换一换</view>
            </view>
          </view>
          <scroll-view scroll-x scroll-with-animation='true' >
            {
              this.state.personalized && this.state.personalized.map(v=>(
                <view className="song-list-item">
                  <view className="content">
                    <image src={v.picUrl}></image>
                    <text>{v.name}</text>
                  </view>
                  <view className="play-volume">
                    <AtIcon value='play' size='15' color='#fff'></AtIcon>
                    <text>
                      {
                        this.Convert.call(this,v.playCount)
                      }
                      
                    </text>
                  </view>
                </view>
              ))
            }
          </scroll-view>
        </view>
        <AtDrawer
          show={this.state.atDrawerShow}
          mask
        >
          <view>q</view>
        </AtDrawer>
      </view>
    )
  }
}
export default  connect(mapStateToProps)(Index)