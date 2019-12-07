/*
* 进行local数据存储管理的工具模块
* */
import store from 'store'

const USER_KEY = 'user_key';
//localStorage如果不兼容  用store库
export default {
    /*
    * 保存user
    * */
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user);
    },

    /*
    * 读取user
    * */
    getUser(){
        //注意，为什么加‘’，应为 parse是需要字符串的
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },

    /*
    * 删除user
    * */
    removeUser(){
        // localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    }
}