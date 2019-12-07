/*
* 包含应用中所有接口请求函数模块
* 返回值是promise
* */
import ajax from './ajax'

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

