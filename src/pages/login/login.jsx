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

export default class  Login extends Component{

    // handleSubmit =(event) =>

    render() {
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
                        <Form.Item>
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />}
                                    placeholder="用户名"
                                />
                        </Form.Item>
                        <Form.Item>
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />
                        </Form.Item>
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