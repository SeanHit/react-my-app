import React,{Component} from 'react'
import {
    Card,
    Select,
    Button,
    Icon,
    Table,
    Input,
    message
} from 'antd'

import  {reqProducts,reqSearchProducts,reqChangeProductStatus} from '../../api/index'
import {  PAGE_SIZE_PRODUCTS  } from '../../utils/constantValues'
import LinkButton from "../../components/link-button";  //表格每页的数量
/*
* 商品主页路由（product默认子路由组件）
* */
const Option =Select.Option
export default class ProductHome extends Component{

    state ={
        // products:[],  //传入的显示表格数据的数组
        products:[],
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
                render:(status,product)=>{

                    let statusTarget =(status ==1)?2:1;
                    console.log(status,statusTarget,product._id);
                    return (
                        <span>
                            <Button type={'primary'} onClick={()=>this.changeStatus(product._id,statusTarget)}>{status ==1?'下架':'上架'}</Button>
                            <span>{status ==1 ? '在售':'已下架'}</span>
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
                products:list,
                loading:false,
            })
        }else{
            //获取失败
        }
    }


    changeStatus =async (productId, status)=>{
        const result = await reqChangeProductStatus(productId, status);
        if(result.status ==0){
            message.success('状态更改成功');
            this.getProducts(this.pageNum || 1);
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
                                    this.pageNum =pageNum;
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