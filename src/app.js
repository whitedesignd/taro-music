
import React,{Component}from 'react';
import './app.less'
import 'taro-ui/dist/style/index.scss'
import { Provider  } from '@tarojs/redux'

import configStore from './redux/store.js'

const store = configStore()

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>
        {this.props.children}
      </Provider>
    
  }
}
export default App
