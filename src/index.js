/*
入口js
 */
// ===========================
import React from 'react';  //react必须的
import ReactDOM from 'react-dom';   //渲染是必须的
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'
//将组件标签渲染到 index页面的div上
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
