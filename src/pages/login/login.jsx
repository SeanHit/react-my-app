import React,{Component} from 'react'
import {
    Form,
    Icon,
    Input,
    Button,
} from 'antd'; //添加ant form组件
import "./login.less"
import logo from './images/login-bg.png'
import {reqLogin} from '../../api/index'
import {message} from "antd";
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
const Item =Form.Item   //不能写在ipmpoot之前
/*
* 登录的路由组件
* */
 class  Login extends Component{

    handleSubmit =(event) =>{


    //    阻止时间的默认行为
        event.preventDefault();

    //    对所有表单数据进行检验
        this.props.form.validateFields(async (err, values) => {
            if (!err){  //校验成功
                const {username,password} =values;
                console.log(username,password)
                //使用await 和 async
                //异步返回
                const result = await reqLogin(username,password);
                console.log("请求成功",result);

               /*
               返回成功
                {
                    "status": 0,
                    "data": {
                    "_id": "5dea34da47adad46381b4aa3",
                        "username": "admin",
                        "password": "21232f297a57a5a743894a0e4a801fc3",
                        "create_time": 1575630042846,
                        "__v": 0,
                        "role": {
                        "menus": []
                    }
                    }
                }
                失败：
                    {
                    "status": 1,
                    "msg": "用户名或密码不正确!"
                    }
                */
                if(result.status===0){  //登录成功
                    message.success('登录成功');

                    const user =result.data;
                //    接收一个user,保存在内存中,存到本地存储
                //    可能用到utils
                    memoryUtils.user =user;  //只是保存在内存中
                    storageUtils.saveUser(user)

                //    跳转到管理界面
                //    replace（不可回退） push(堆栈可回退,也就是可回退)
                    this.props.history.push("/admin")
                }else{  //登录失败
                    message.error("登录失败"+result.msg);
                }
            }else{  //校验失败
                console.log("校验失败",values);
            }
        });


    //    得到form对象
    //     const form= this.props.form;
    //     //获得表单项数据
    //     const values =form.getFieldsValue(); //返回的是对象
    //     console.log("handleSubmit()",values);
    }

    /*
    * 对密码进行自定义验证
    * */
    validatePassword =(rule,value,callback) =>{
        console.log("validatePassword()",rule,value);
        if(!value){
            callback("密码不能为空");
        }
    }
     render() {

        const user =memoryUtils.user
        if(user && user._id){
            return <Redirect to={'/admin'} />
        }

        //得到具有强大功能form表单  对象
        const form =this.props.form
        //非常重要
        const { getFieldDecorator } =form;
        return(
            <div className={"login"}>
                <header className={"login-header"}>
                    <img src={logo} alt={""}/>
                    {/*//加载动态的值*/}
                    <h1>哈工大实验中心</h1>
                </header>
                <section className={"login-content"}>
                    <h2>用户登录</h2>
                    {/* 分割而已*/}
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {
                                /*
                                用户名/密码的的合法性要求
                                1). 必须输入
                                2). 必须大于等于 4 位
                                3). 必须小于等于 12 位
                                4). 必须是英文、数字或下划线组成
                                */
                                getFieldDecorator("username",{  //配置对象：属性名时特定名称
                                    //声明式验证：直接使用别人写好的方式验证
                                    initialValue: "admin",   //初始值
                                    rules: [
                                        { required: true ,whitespace :true,message:'字段值不能为空 ' },
                                        { min: 4, message:'最小长度为4 ' },
                                        { max: 12, message: '最大长度不能大于12位 '},
                                        { pattern :/^[a-zA-Z0-9_&]+$/,message:"必须是英文、数字或下划线组成 "},
                                        ],
                                })( //高阶函数  {}用来表示验证的规则
                                    //username是用来标识名称，用来获取输入框的值
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator("password",{
                                    rules: [
                                        //注意不要写错
                                        // {validator:  this.validatePassword  },
                                    ],
                                })( //高阶函数  {}用来表示验证的规则
                                    //password是用来标识名称，用来获取输入框的值
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                {/*    */}
                </section>
            </div>)

    }
}

//Login传入的组件
/*
1.高阶函数
    1） 一类特别的函数
        a.接收函数类型的参数
        b.函数的返回值是函数
    2）.常见
        a.定时器；setTimeOut()/setInterval
        b.Promise：Promise(()=>{})  then(value =>{} ,reason =>{})
        c.数组遍历相关的方法：foreach(),filter(),map(),reduce(),find(),findIndex()
        d.函数对象的bind();
        e.For.creat()(传入就组件);，生成新组件    /getFieldDecorator()()
        f.
    3）. 高阶函数更加具有扩展性

2.高阶组件
    1）本质是一个函数
    2）接收一个组件，返回一个新的组件（包装组件），
        包装组件会向被包装组件传入特定属性，新组建内部渲染被包装组件
        For.creat()(传入就组件)
        返回的对象是一个高阶组件
    3）作用：扩展组件的属性。组件本质是函数
    4）其实也是一个高阶函数：接收组件函数，返回新的组件函数
组件时类，标签可以看成时实例
*/

/*
* 包装Form组件生成一个新的组件，生成的新的组件： Form(Login)
* 新组建会向form组件传递一个新的组件Login
* */
const WrapLogin =Form.create()(Login);
export  default WrapLogin

/*
*  asnyc 和  awit
*
* 1.作用？
*   简化promise,不用使用then()来指定成功/失败的回调函数
*   以同步编码（就是没有回调函数）方式实现异步流程
* 2.哪里写await?
*   在返回promise表达式左侧写await:不想要promise,
*       想要promise异步执行成功的value数据
* 3.哪里写async
*   在await最近函数左侧
* */