import React,{Component} from 'react'
import {Redirect}  from 'react-router-dom'  //跳转用
import memoryUtils from '../../utils/memoryUtils'
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
                <div>Hello {user.username}</div>
            )
        }

    }
}