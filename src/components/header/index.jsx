import React,{Component} from 'react'
import "./index.less"
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from "../../api";
import {withRouter} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Modal, Button } from 'antd';

import menuList from '../../config/menuConfig'
import LinkButton from "../link-button";

/*
* 头部
* */

 class Header extends Component{

    state ={
        currentTime:formateDate(Date.now()),
        dayPictureUrl: '',
        weather: ''
    }

    // 获取当前时间：每隔一秒获取currentTime
    getTime =()=>{
         this.intervalTd  = setInterval(()=>{
            const currentTime =formateDate(Date.now());
            this.setState({currentTime});
        },1000);
    }
    //获取天气信息
    getWeather =async () =>{
        //注意返回的是promise
        /*
        * 因为百度现在已经不支持这个api了，所以我自己模拟一下数据
        * */
        // const {dayPictureUrl,weather} = await reqWeather('北京') ;
        const {dayPictureUrl,weather} ={
            "date": "周日 06月02日 (实时：30℃)",
            "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/duoyun.png",
            "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/leizhenyu.png",
            "weather": "多云转雷阵雨",
            "wind": "西南风3-4级",
            "temperature": "31 ~ 20℃"
        };
    //    更新状态
        this.setState({dayPictureUrl,weather})
    }

    //又用到了 给路由组件变成路由组件的知识
    // import {withRouter}
    //    包装
    // 看 menuList
    getTitle = () => {
        const path =this.props.location.pathname;
        let title;
        menuList.forEach(item =>{
            if(item.key === path){
                //如果当前的key 和 path 一样，title就是需要的title
                title =item.title;
            }else if(item.children) { //如果有孩子
                const cItem =item.children.find(cItem =>  path.indexOf(cItem.key) ===0);
                if (cItem){
                    title =cItem.title;
                }
            }
        })
        return title;
    }

    logout =() =>{
        Modal.confirm(
            {
                title: '请确认你要退出吗?',
                // content: 'Some descriptions',
                onOk:() => {
                    console.log('OK',this);
                //    1 将内存 和 本地的user清除
                //    2 跳转到登陆界面
                    storageUtils.removeUser();
                    memoryUtils.user ={};
                    this.props.history.replace('/login');
                }
            }
        )
    }

    /*
    * 第一次render()之后进行一次操作
    * 一般在这里执行异步操作：  1.发ajax请求
    *                           2.启动计时器
    * */
    componentDidMount() {
        this.getTime();
        this.getWeather();
    }

    /*
    * 当前组件被卸载之前
    * */
    componentWillUnmount() {
        clearInterval(this.intervalTd);
    }

     render() {
        const title = this.getTitle();
        const username =memoryUtils.user.username;
        const {currentTime,dayPictureUrl,weather} =this.state;
        return(
            <div className={"header"}>
                <div className={"header-top"}>
                    <span>欢迎，{username}</span>
                    <LinkButton href="javascript:" onClick={this.logout}>退出</LinkButton>
                </div>
                <div className={"header-bottem"}>
                    <div className={"header-bottem-left"}>{title}</div>
                    <div className={"header-bottem-right"}>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt='weather'/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);