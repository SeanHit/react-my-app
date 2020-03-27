import React,{Component} from 'react'
import {
    Card,
    List,
    Input,
    Upload,  //上传文件
    Cascader,   //级联
    Button,
    Icon,
    Form
} from "antd";

import PicturesWall from './PicturesWall'
import LinkButton from "../../components/link-button";
import {reqCategorys}  from  '../../api/index'

const Item =Form.Item;

/*
* product的增加子路由
* */



 class ProductAddUpdate extends Component{

     state ={
         options:[]
     }



     /*
     * 这里是验证价格的输入情况
     * */
     validatorPrice = (rule,value,callback)=>{
             if(value-0 <=0){
                 callback('商品价格不可以小于等于0');
             }else{
                 callback();
             }
         }

     //提交表单
     submit =()=>{
         this.props.form.validateFields((error,values)=>{
             if(!error){
                 console.log(values);
                alert('发送ajax请求')
             }
         })
     }

     getCategorys = async (parentID)=>{
         const  result = await  reqCategorys(parentID);
         if(result.status === 0){
             // console.log('添加商品页面：一级分类列表', result.data);
             const categorys = result.data;
             if(parentID-0 === 0){  //一级分类列表
                 this.initOptions(categorys);
             }else{
                 return categorys;  //返回值是一个promise
             }

         }

     }

    /*
    * 根据返回的分类去生成options的对象
    * */
     initOptions =async (categorys)=>{
         //categorys的项
         // {
         //     "status": 1,
         //     "imgs": [
         //     "image-1559467198366.jpg"
         // ],
         //     "_id": "5cf394d29929a304dcc0c6eb",
         //     "name": "商品A",
         //     "desc": "一个笔记本",
         //     "price": 11111,
         //     "detail": "<p><strong>abc</strong></p>\n",
         //     "pCategoryId": "5ca9d6c0b49ef916541160bb",
         //     "categoryId": "5ca9db78b49ef916541160ca",
         //     "__v": 0
         // }

        //  option
        // {
        //      value: 'zhejiang',
        //      label: 'Zhejiang',
        //      isLeaf: false,
        //  }
        const options =categorys.map((curr)=>({
            value: curr._id,
            label: curr.name,
            isLeaf:false
        }));

        //如果是更新过来的
         const {pCategoryId,categoryId} = this.product;
         if(pCategoryId === undefined ){
             //是添加商品传过来的，没有保存的 product
         }else{
             //添加商品传过来的
             if(pCategoryId-0 !== 0) {
                 //表示不是一级分类
                 const subCategorys = await this.getCategorys(pCategoryId);
                 const targetOptionChildren = subCategorys.map((curr) => ({
                     label: curr.name,
                     value: curr._id,
                     isLeaf: true
                 }))
                 //找到一级分类
                 const firstCategory =  options.find(curr=>curr.value === pCategoryId) || {};   //假设不存在这个firstCategory
                 //设置为一级分类的children
                 firstCategory.children =targetOptionChildren;

             }
         }
        this.setState({
            options
        })
     }

     /*
        *
        * 级联的加载数据
        * */
     loadData = async selectedOptions => {
         const targetOption = selectedOptions[0];   //可以选择很多，这里只选择一个options
         targetOption.loading = true;

         const subCategorys = await this.getCategorys(targetOption.value);
         targetOption.loading = false;
         if(subCategorys && subCategorys.length> 0){
             targetOption.children =subCategorys.map((curr)=>({
                 label:curr.name,
                 value:curr._id,
                 isLeaf: true
             }))

             this.setState({
                 options:[...this.state.options]
             })
         }else{
             //没有二级分类
             targetOption.isLeaf =true;
         }
         this.setState({
             options: [...this.state.options],
         });
     };




     componentDidMount() {
         this.getCategorys(0);
     }
     componentWillMount() {
         console.log('product',this.props.location.state)
         this.product = this.props.location.state || {};
     }


     render() {
         const product =this.product;
         const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 10 },
        };
        const title =(
            <div>
                <LinkButton onClick ={this.props.history.goBack}>
                    <Icon type={'arrow-left'} />
                </LinkButton>
                <span>{
                    this.product.name ? '修改商品':'添加商品'

                }</span>
            </div>
        )

        const  {getFieldDecorator}   =this.props.form;
        return(
            <div>
                <Card title={title}  className={'product-addUpdate'}>
                    <Form
                        {...formItemLayout}
                    >
                        <Item label={'商品名称'}>
                            {
                                getFieldDecorator('name',{
                                    //配置对象
                                    initialValue: product.name,
                                    rules:[
                                        { required:true, message:'请必须输入商品名称'}
                                    ]
                                })(
                                    <Input placeholder={'请输入商品名称'}/>
                                )
                            }
                        </Item>

                        <Item label={'商品描述'}>
                            {
                                getFieldDecorator('desc',{
                                    //配置对象
                                    initialValue: product.desc,
                                    rules:[
                                        { required:true, message:'请必须输入商品描述信息'},
                                        { min: 10 ,message:'商品描述字数不小于十个字'}
                                    ]
                                })(
                                    <Input.TextArea
                                        placeholder={"请输入商品描述"}
                                        autoSize ={{
                                            minRows:2 ,
                                            maxRows:6 ,
                                        }}
                                    />
                                )
                            }
                        </Item>


                        <Item label={'商品价格'}>
                            {
                                getFieldDecorator('price',{
                                    //配置对象
                                    initialValue: product.price,
                                    rules:[
                                        { required:true, message:'请必须输入商品描述信息'},
                                        { validator: this.validatorPrice}
                                    ]
                                })(
                                    <Input type={'number'} placeholder={'请输入商品名称'} addonAfter="元"/>
                                )
                            }
                        </Item>

                        <Item label={'商品分类'}>
                            {
                                getFieldDecorator('categorys',{
                                    //配置对象
                                    initialValue: [product.pCategoryId,product.categoryId],
                                    rules:[
                                        { required:true, message:'请必须指定商品分类'},
                                    ]
                                })(
                                    <Cascader
                                        options={this.state.options}
                                        loadData={this.loadData}   //加载某个列表项的列表项的监听回调
                                    />
                                )
                            }

                        </Item>

                        <Item label={'商品图片'}>
                            <PicturesWall/>
                        </Item>
                        <Item label={'商品详情'}>
                            <Input type={'number'} placeholder={'请输入商品名称'} addonAfter="元"/>
                        </Item>
                        <Item >
                            <Button  type={'primary'} onClick={this.submit}>提交</Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

const WrappedDemo = Form.create()(ProductAddUpdate);
 export default WrappedDemo;

