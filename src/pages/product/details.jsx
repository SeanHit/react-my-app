import React,{Component} from 'react'
import {
    Card,
    Button,
    Icon,
    List
} from 'antd'

import LinkButton from '../../components/link-button'
import pic1 from './images/pic1.png'
import {reqCategory} from  '../../api/index'

const Item =List.Item;

/*
* product的增加子路由
* */

export default class ProductDetails extends Component{


    state = {
        cName1 :'',
        cName2 : ''
    }

    async componentDidMount() {
        const {pCategoryId,categoryId}  =this.props.location.state;
        if(pCategoryId === '0'){  //一级分类
            const result =await reqCategory(categoryId);
            const cName1 =result.data.name;
            if(!cName1) {
                this.setState({
                    cName1
                })
            }
        }else{   //二级分类
            /*
            * 此方式是同步执行俩个异步请求，这种方式不能同时发送请求。
            * 使用promise.all可以
            * */
            // const result1 =await reqCategory(pCategoryId);
            // const result2 =await reqCategory(categoryId);
            // const cName1 = result1.data ? result1.data.name : '';
            // const cName2 = result2.data ? result2.data.name : '';
            // console.log(cName1,cName2);

            const results =await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)] )
            const cName1 = results[0].data ? results[0].data.name : '';
            const cName2 = results[1].data ? results[1].data.name : '';

            if(cName1 && cName2){
                this.setState({
                    cName1 ,
                    cName2 ,
                })
            }

        }
    }


    render() {

        const {name,desc,price,detail,imgs} =this.props.location.state;
        const {cName1,cName2} =this.state;
        console.log('cname1'+cName1,cName2);
        const title =(
            <span>
                <LinkButton onClick ={this.props.history.goBack}>
                    <Icon type={'arrow-left'} style={{marginRight:'10px' ,fontSize: '10px'}}/>
                </LinkButton>
                <span>商品详情</span>
            </span>
        )

        return(
            <div>
                <Card title={title}  className={'product-details'}>
                    <List>
                        <Item>
                            <span className={'left'}>商品名称：</span>
                            <span>{name}</span>
                        </Item>
                        <Item>
                            <span className={'left'}>商品详情：</span>
                            <span>{desc}</span>
                        </Item>
                        <Item>
                            <span className={'left'}>商品价格：</span>
                            <span>{price}元</span>
                        </Item>
                        <Item>
                            <span className={'left'}>所属分类：</span>
                            <span>
                                {
                                    cName1+ (cName2===''?'':`-->${cName2}`)
                                }
                            </span>
                        </Item>
                        <Item>
                            <span className={'left'}>商品图片：</span>
                            <img className={'products-pic'} src={pic1} alt={'电脑图片'}/>
                            <img className={'products-pic'} src={pic1} alt={'电脑图片2'}/>
                        </Item>
                        <Item>
                            <span className={'left'}>商品详情：</span>
                            <span dangerouslySetInnerHTML={{__html:detail}}></span>
                        </Item>
                    </List>
                </Card>
            </div>
        )
    }
}