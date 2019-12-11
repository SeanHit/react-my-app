import React,{Component} from 'react'
import {Divider} from "antd";
import './index.less'
import logo from '../../assets/images/logo.png'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon, Button } from 'antd';
import menuList  from'../../config/menuConfig'
/*
* 左侧导航
* */
const { SubMenu } = Menu;

class LeftNav extends Component{

    //map()递归调用
    getMenuNodes_map =(menuList) =>{
        return menuList.map(item =>{
            if(!item.children){
                return(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                return (
                    <SubMenu  //商品子菜单
                        key={item.key}
                        title={
                            <span>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes_map(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    getMenuNodes_reduce =(menuList) =>{
        const path =this.props.location.pathname;
        return menuList.reduce((pre,item) =>{
            //向pre中添加《》Menu.item 或者  menu.item
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }else{
                if(item.children.find(cItem => cItem.key === path))
                {
                    this.openKey = item.key
                }
                pre.push((
                    <SubMenu  //商品子菜单
                        key={item.key}
                        title={
                            <span>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes_reduce(item.children)}
                    </SubMenu>
                ))
            }
            return pre;
        },[])
    }

    componentWillMount() {  //第一次render之前
        this.menuNodes =this.getMenuNodes_reduce(menuList)
    }

    render() {
        // debugger
        //取得当前请求的路由路径
        const path =this.props.location.pathname;
        console.log("render",path)
        // const openkey =this.openkey;
        return(
            <div  className={"left-nav"} >
                <Link to="/admin"  className={"left-nav-header"}>
                    <img src={logo} alt={"log"}/>
                    <h1>尚硅谷后台</h1>
                </Link>

                <Menu
                    // defaultSelectedKeys={[path]}   //字符串数组
                    selectedKeys={[path]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                    // inlineCollapsed={this.state.collapsed}
                >
                    {
                        this.menuNodes
                        // this.getMenuNodes_reduce(menuList)
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav);

/*
* withRouter  高阶组件
* 包装一个非路由组件，返回一个新的组件
* 新的组件向非路由组件传递三个属性：location，history，match
* */