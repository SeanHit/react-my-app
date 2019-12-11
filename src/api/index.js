/*
* 包含应用中所有接口请求函数模块
* 返回值是promise
* */import {message} from "antd";
import ajax from './ajax'
import jsonp from 'jsonp'

// const BASE ='http://localhost:5000'
const BASE = '' //使用了代理 ，不需要了
// export function reqLogin(username,password) {
//      return  ajax("./login",{username,password},'POST')
// }
//换成下面这个
//这个是登录ajax
export const reqLogin =(username,password) =>ajax(BASE+"/login",{username,password},'POST')

// export const reqAddUser =()=>ajax()

//或者
// export  default {
//     xxx (){
//
//     },
//     yyy(){
//
//     }
// }

/*
* jsonpde请求  去github查文档
* url,配置对象，回调函数。函数（err,data）
* */
export const reqWeather =(city) =>{

    return new Promise((resolve,reject)=>{
        const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        //发送jsonp请求
        jsonp(url,{},(err,data)=>{
            console.log('jsonp()',err,data);
            if(!err && data.status ==='success'){
                //获取数据
                const {dayPictureUrl,weather} =data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather})
            } else{
                //失败
                message.error("获取信息失败");

            }
        })
    })
}

