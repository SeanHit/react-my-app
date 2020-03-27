import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {
    Input,
    Form,
} from 'antd'

class UpdateForm extends Component{
    static propTypes ={
        categoryName: PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }

    //同步调用的
    componentWillMount() {
    //    同步调用,调用父组件的方法
    //    其实将form传给父对象，对自己没什么影响
        this.props.setForm(this.props.form);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {categoryName} =this.props;
        return(
            <div>
                <Form >
                    <Form.Item>
                        {
                            getFieldDecorator('categoryName',
                                {
                                    initialValue: categoryName,
                                    rules: [
                                        {required: true, message: '添加的类别不为空'},
                                    ],
                                }
                            )(
                                <Input placeholder={'请输入分类名称'}></Input>
                            )
                        }
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default Form.create()(UpdateForm);