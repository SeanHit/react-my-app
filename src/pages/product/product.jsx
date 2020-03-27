import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductDetails from'./details'
import ProductAddUpdate from'./add-update'
import ProductHome from'./home'

import './product.less'
/*
* 商品管理路由
* */

export default class Product extends Component{
    render() {
        return(
            <div>
                <Switch>
                    <Route path='/product' component={ProductHome} exact></Route>
                    <Route path='/product/details' component={ProductDetails}></Route>
                    <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
                    <Redirect to={'/product'}/>
                </Switch>
            </div>
        )
    }
}