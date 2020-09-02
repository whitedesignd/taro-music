import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro';
import './index.less'
import 'taro-ui/dist/style/index.scss'

export default class Index extends Component {
  state = {
    seachValue: ''
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  searchClick(e) {
    Taro.navigateTo({url:"/pages/seach/seach"})
  }
  render () {
    return (
      <View className='index'>
        <View className="header">
          <AtIcon value='bullet-list' size='25px'></AtIcon>
          <Text>云音乐</Text>
          <AtIcon value='search' size='25px' onClick={this.searchClick.bind(this)}></AtIcon>
        </View>
      </View>
    )
  }
}
