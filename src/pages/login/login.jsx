import React,{Component} from 'react'
import {
    Form,
    Icon,
    Input,
    Button,
} from 'antd'; //添加ant form组件
import "./login.less"
import logo from './images/login-bg.png'

const Item =Form.Item   //不能写在ipmpoot之前
/*
* 登录的路由组件
* */
 class  Login extends Component{

    handleSubmit =(event) =>{

    //    阻止时间的默认行为
        event.preventDefault();
    //    得到属性对象
        const form= this.props.form;
        const values =form.getFieldsValue(); //返回的室对象
        console.log("handleSubmit()",values);
    }
    render() {
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
                                getFieldDecorator("username",{})( //高阶函数  {}用来表示验证的规则
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
                                getFieldDecorator("password",{})( //高阶函数  {}用来表示验证的规则
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

2.高阶组件
*/

/*
* 包装Form组件生成一个新的组件，生成的新的组件： Form(Login)
* 新组建会向form组件传递一个新的组件Login
* */
const WrapLogin =Form.create()(Login);
 export  default WrapLogin