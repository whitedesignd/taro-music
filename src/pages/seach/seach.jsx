import React,{useEffect,useState,useRef} from 'react';
import './seach.less';

import {AtIcon,AtList, AtListItem } from 'taro-ui';
import API from '../../API/api.js';
export default function seach(props) {
    //历史记录
    const [hasSeachHistory,setHasHistory] = useState('');

    const seachInput = useRef();

    // 弹窗显示
    const [isModal,setModal] = useState(false);

    // 热搜
    const [seachHot,setSeachHot] = useState('');

    //搜索建议
    const [seachSuggest,setSuggest] = useState('');
    useEffect(()=>{
        API.getSeachHot().then(res =>{
            let {code,data} = res.data;
            if(code==200){
                setSeachHot(data);
            }
        });
        let value = wx.getStorageSync('seachHistory')
        if(value){
            setHasHistory(value);
        }
    },[]);

    // 回车跳转
    function seachNav(e) {
        console.log(e);
    }
    // 删除input的value
    const deleteSeach = (e)=>{
        if(seachInput.current.value != ''){
            seachInput.current.value = '';
            setSuggest('');
        }
        seachInput.current.focus();
    }
    // 删除历史
    const deleteHistory = (e) =>{
        setModal(true)
    }
    // 搜索建议
    const seachChange = (e) => {
        API.getSearchSuggest({keywords:e.detail.value,type:'mobile'}).then(res =>{
            let {code,result} = res.data;
            if(code==200){
                setSuggest(result.allMatch);
            }
        });
    }
    
    const listValue = (v,e) => {
        
    }
    return (
        <view className='seach' style={{backgroundColor: isModal?' #c4c3c3c4':''}}>
            <view className="seach-input">
                <input type="text" placeholder='请输入歌曲或歌手名' 
                    focus
                    onConfirm={seachNav}
                    ref={seachInput}
                    onInput={seachChange}
                />
                <view hoverClass='icon-hover' className='icon' style={{color:"#a0a0a0"}} onClick={deleteSeach}>
                    <AtIcon value='close' size='20' ></AtIcon>
                </view> 
                <view className="data-list">
                    {
                        seachSuggest && (
                            <AtList className='option'>
                                {
                                    seachSuggest.map((v,i) => <AtListItem title={v.keyword} onClick={listValue.bind(this,v.keyword)}>{v.keyword}</AtListItem>)
                                }
                            </AtList>
                        )
                    }
                </view>
            </view>
            <view className="content">
                {
                    hasSeachHistory && (<view className="recording">
                            <view className="title">
                                <text> 历史记录</text>
                                <view className="icon" hoverClass='icon-hover' onTouchStart={deleteHistory}>
                                    <AtIcon value='trash' size='20'></AtIcon>
                                </view>
                            </view>
                            <scroll-view className="seach-tag" 
                                scroll-x='true' 
                                scroll-with-animation='true'
                            >
                                {
                                    hasSeachHistory.map(v => {
                                    return <view hoverClass='tag-hover'>
                                                <text hoverClass='tag-hover'>{v}</text>
                                        </view>
                                    })
                                }
                            </scroll-view>
                        </view>
                    )
                }
                <view className="hot-title">热搜榜</view>
                    {
                        seachHot == ''?<loding></loding>:<scroll-view scroll-y='true'className="hot-list">
                            {
                                seachHot.map( (v,i) => (
                                    <view className="hot-item" hoverClass='hot-hover'>
                                        <view className="rank">{i+1}</view>
                                        <view className="song">
                                            <view className="song-name">
                                                <view>{v.searchWord}</view>
                                                {
                                                    v.iconUrl && <cover-image src={v.iconUrl} style={{width: v.iconType !=5?'80rpx':'40rpx'}}></cover-image>
                                                } 
                                            </view>
                                            <view className="song-introduction">{v.content}</view>
                                        </view>
                                        <view className="song-score">{v.score}</view>
                                    </view>
                                ))
                            }
                        
                        </scroll-view>
                    }
                <view className="modal" style={{display:isModal?'bolck':'none'}}>
                    <view className="title">确定清空全部历史记录？</view>
                    <view className="res">
                        <text onClick={(e)=> setModal(false)}>取消</text>
                        <text onClick={(e)=>{
                                console.log(e);
                                wx.setStorageSync('seachHistory', '');
                                setModal(false);
                                setHasHistory('')
                            }}>清空</text>
                    </view>
                </view>
            </view>
        </view>
    )
}
