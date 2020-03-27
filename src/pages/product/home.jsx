import React,{Component} from 'react'
import {
    Card,
    Select,
    Button,
    Icon,
    Table,
    Input
} from 'antd'

import  {reqProducts,reqSearchProducts} from '../../api/index'
import {  PAGE_SIZE_PRODUCTS  } from '../../utils/constantValues'
import LinkButton from "../../components/link-button";  //表格每页的数量
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
        ],
        total: 0,   //总数
        loading:false,  //loading效果
        searchType:'productName',
        searchContent:'',
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
                render:(product)=>{
                    return (<div>
                                <LinkButton onClick={()=>{this.props.history.push('/product/details',product)}}>详情</LinkButton>
                                <LinkButton onClick={()=>{this.props.history.push('/product/addupdate',product)}}>修改</LinkButton>
                            </div>
                    )
                }
            },
        ];
    }
    getProducts = async (pageNum)=>{

        this.setState({
            loading: true
        })
        const {searchType,searchContent} =this.state;
        let result;
        if(searchContent){
            result =await reqSearchProducts({
                                                pageNum,
                                                PAGE_SIZE_PRODUCTS,
                                                searchContent,
                                                searchType
                                            });
        }else{
            result =await reqProducts(pageNum,PAGE_SIZE_PRODUCTS);  //3
        }


        // this.setState({
        //     loading: false
        // })


        /*
        * 获取成功的内容
        * */
        if(result.status === 0){
            //获取成功
            console.log(result);
            const {total, list} =result.data;   //解构赋值
            this.setState({
                total,
                // products: list,
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
                        "pCategoryId": "5df1d98ab8ca3049d05c23f7",
                        "categoryId": "5df276cb3c88c85ca01afeac",
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
                ],
                loading:false,
            })
        }else{
            //获取失败
        }
    }



    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getProducts(1);
    }

    render() {

        const {products,total,loading,searchContent,searchType} = this.state;


        const title =(
            <span>
                <Select value={searchType} style={{width:120}} onChange={(value => this.setState({searchType:value}))}>
                    <Option value={'productName'}>按名称搜索</Option>
                    <Option value={'productDesc'}>按类型搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width:150,margin:'0 15px'}}  value={searchContent} onChange={(e)=>{this.setState({searchContent:e.target.value})}}></Input>
                <Button type={'primary'} onClick={()=>this.getProducts(1)}>
                    搜索
                </Button >
            </span>
        )
        const extra =(
            <Button type={'primary'} onClick={()=> this.props.history.push('/product/addupdate')}>
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
                        loading={ loading }
                        pagination ={  //配置分页信息
                            {
                                showQuickJumper: true,
                                defaultPageSize : PAGE_SIZE_PRODUCTS,
                                total:total,
                                onChange: (pageNum)=>{
                                    this.getProducts(pageNum);
                                }
                            }
                        }
                    />
                </Card>
            </div>
        )
    }
}