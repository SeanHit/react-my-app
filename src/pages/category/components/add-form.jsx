import React,{Component} from 'react'
import propTypes from 'prop-types'
import {
    Input,
    Form,
    Select,
} from 'antd'

class AddForm extends Component{
     // const { getFieldDecorator } = this.props.form;
    static propTypes ={
        setForm:propTypes.func.isRequired,
        categorys:propTypes.array.isRequired,  //一级分类数组
        parentId: propTypes.string.isRequired  //夫分类id
    }
    componentWillMount() {
        this.props.setForm(this.props.form);
    }

    render() {
        const Option = Select.Option;
        const { getFieldDecorator } = this.props.form;
        const {categorys,parentId} =this.props
        return(
            <div>
                <Form >
                    <Form.Item>
                        {
                            getFieldDecorator('parentId', {
                                initialValue:parentId
                            })(<Select>
                                    <Option value='0'>一级分类</Option>
                                    {
                                        categorys.map(item=><Option value={item._id}>{item.name}</Option>)
                                    }
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('categoryName',
                                {
                                    initialValue: '',
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

const WrapAddForm = Form.create()(AddForm);
export default WrapAddForm;

