import React,{Component} from 'react'
import {Redirect,Route,Switch}  from 'react-router-dom'  //跳转用
import memoryUtils from '../../utils/memoryUtils'

import { Layout } from 'antd';  //布局
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import Home from '../home/home'
import Category from '../category/category'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'




const {Footer, Sider, Content } = Layout;
/*
* 管理的路由组件
* */

export default class  Admin extends Component{

    render() {
        //从内存中获取数据
        const user =memoryUtils.user;
        if(!user || !user._id){
            //render()自动跳转到登录
            return <Redirect to={'/login'}/>
        }else{
            return(
                <Layout style={{minHeight:"100%"}}>
                    {/*左侧导航*/}
                    <Sider>
                            <LeftNav/>
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style={{margin: 20,backgroundColor:"white"}}>
                            <Switch>
                                <Route path={'/home'} component={Home}></Route>
                                <Route path={'/category'} component={Category}></Route>
                                <Route path={'/product'} component={Product}></Route>
                                <Route path={'/user'} component={User}></Route>
                                <Route path={'/role'} component={Role}></Route>
                                <Route path={'/charts/bar'} component={Bar}></Route>
                                <Route path={'/charts/line'} component={Line}></Route>
                                <Route path={'/charts/pie'} component={Pie}></Route>
                                <Redirect to={'/home'}/>
                            </Switch>
                        </Content>
                        <Footer style ={{textAlign:"center",color: "#cccccc"}}>尾部</Footer>
                    </Layout>
                </Layout>
            )
        }

    }
}