import React ,{Component} from 'react'
import './index.less'

/*
* 自定义的一个组件，外形像连接《a》的一个按钮
* */

export default function LinkButton(props) {
    return <button {...props} className={'link-button'}></button>
}