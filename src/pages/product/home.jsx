import React,{Component} from 'react'
import {
    Card,
    Select,
    Button,
    Icon,
    Table,
    Input
} from 'antd'
/*
* 商品主页路由（product默认子路由组件）
* */
const Option =Select.Option
export default class ProductHome extends Component{
    render() {
        const title =(
            <span>
                <Select style={{width:120}}>
                    <Option value={'1'}>按名称搜索</Option>
                    <Option value={'2'}>按类型搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width:150,margin:'0 15px'}}></Input>
            </span>
        )
        const extra =(
            <Button type={'primary'}></Button>
        )



        return(
            <div>
                <Card title={title} extra={extra}>

                </Card>
            </div>
        )
    }
}