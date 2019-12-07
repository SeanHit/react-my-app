import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Button ,message} from 'antd';
//两种路由 hash和browser
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

/* 应用根组件
*
*/

export default class App extends Component {
    render() {   //js语法 生成虚拟dom
        // return <div>App</div>  //然后生成真实的dom
        return (<BrowserRouter>
            <Switch> {/*只匹配某一个路由,注意大写*/}
                <Route path={'/login'} component={Login}></Route>
                {/*<Route path={'/'} component={Login}></Route>*/}
                <Route path={'/admin'} component={Admin}></Route>
            </Switch>
        </BrowserRouter>)
    }

}

