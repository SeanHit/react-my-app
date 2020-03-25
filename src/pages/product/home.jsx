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

    state ={
        // products:[],  //传入的显示表格数据的数组
        products:[
            {
                "status": 1,
                "imgs": [
                    "image-1559402396338.jpg"
                ],
                "_id": "5ca9e05db49ef916541160cd",
                "name": "联想ThinkPad 翼4809",
                "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
                "price": 65999,
                "pCategoryId": "5ca9d6c0b49ef916541160bb",
                "categoryId": "5ca9db9fb49ef916541160cc",
                "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
                "__v": 0
            },
            {
                "status": 1,
                "imgs": [
                    "image-1559402448049.jpg",
                    "image-1559402450480.jpg"
                ],
                "_id": "5ca9e414b49ef916541160ce",
                "name": "华硕(ASUS) 飞行堡垒",
                "desc": "15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)",
                "price": 6799,
                "pCategoryId": "5ca9d6c0b49ef916541160bb",
                "categoryId": "5ca9db8ab49ef916541160cb",
                "detail": "<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span>&nbsp;</p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span>&nbsp;</p>\n",
                "__v": 0
            }
        ]
    }
    /*
    * 初始化表格列的函数，需要在componentWillMount中调用一次就好了
    * */
    initColumns =()=>{
        this.columns =[
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render:(price)=>{
                    return '￥'+price;
                }
            },
            {
                width: 100,
                title: '状态',
                dataIndex: 'status',
                render:()=>{
                    return (
                        <span>
                            <Button type={'primary'}>下架</Button>
                            <span>下架</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render:()=>{
                    return (<div>
                                <Button type={'primary'}>详情</Button>
                                <Button type={'primary'}>修改</Button>
                            </div>
                    )
                }
            },
        ];

    }


    componentWillMount() {
        this.initColumns();
    }

    render() {

        const {products} = this.state;


        const title =(
            <span>
                <Select value={'1'} style={{width:120}}>
                    <Option value={'1'}>按名称搜索</Option>
                    <Option value={'2'}>按类型搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width:150,margin:'0 15px'}}></Input>
            </span>
        )
        const extra =(
            <Button type={'primary'}>
                <Icon type={'plus'}></Icon>
                添加商品
            </Button>
        )



        return(
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        bordered={true}
                        rowKey={'_id'}
                        dataSource={products}
                        columns={this.columns}
                    />;
                </Card>
            </div>
        )
    }
}