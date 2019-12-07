/*
入口js
 */
// ===========================
import React from 'react';  //react必须的
import ReactDOM from 'react-dom';   //渲染是必须的
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import 'antd/dist/antd.css'              //引入css

//读取local中保存user,保存在内存中
//读取user,放到内存中
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
const  user =storageUtils.getUser();
memoryUtils.user =user;
//不管访问什么页面都会经过这里
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();

