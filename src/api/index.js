/*
* 包含应用中所有接口请求函数模块
* 返回值是promise
* */import {message} from "antd";
import ajax from './ajax'
import jsonp from 'jsonp'

// const BASE ='http://120.26.176.6:5000'
// const BASE = '/api' //使用了代理 ，不需要了
const BASE = ''
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


        const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=tFBA6jAeRajS9NZzTOgrO2ugf7btGZap`
        console.log(url);
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

//商品分类
//1.获取一级/二级分类列表
//2.添加分类
//3.更新分类
export const  reqCategorys =(parentId) =>ajax(BASE+'/manage/category/list',{parentId},'GET');
export const reqAddCategorys =(parentId,categoryName) =>ajax(BASE+'/manage/category/add',{parentId,categoryName},'POST');
export  const reaUpdateCategorys =(categoryId,categoryName) =>ajax(BASE+'/manage/category/update',{categoryId,categoryName},'POST');

//获得商品分页列表
export  const reqProducts =(pageNum,pageSize) =>ajax(BASE+'/manage/product/list',{pageNum,pageSize});
//更改商品的状态
export const reqChangeProductStatus =(productId, status) =>ajax(BASE+'/manage/product/updateStatus',{productId,status},'POST');

//根据ID/Name搜索产品分页列表
export const  reqSearchProducts =({pageNum,pageSize,searchContent,searchType}) =>
                                    ajax(BASE+'/manage/product/search',
                                        {
                                            pageNum,
                                            pageSize,
                                            [searchType]:searchContent,
                                        },
                                        'GET');

export const reqCategory = (categoryId)=>ajax(BASE+'/manage/category/info',{categoryId});

//删除图片
export const reqDeleteImg =(name)=>ajax(BASE+'/manage/img/delete',{name},'POST');

//添加商品信息
export const reqAddOrUpdateProduct =(product) =>ajax(BASE+'/manage/product/'+(product._id ? 'update':'add'),product,'POST');

// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST')
// 获取角色列表
export const reqRoles = () => ajax('/manage/role/list')
// 更新角色(给角色设置权限)
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST')

// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')

// 获取用户列表
export const reqUsers = () => ajax('/manage/user/list')

// 删除用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete', {userId}, 'POST')