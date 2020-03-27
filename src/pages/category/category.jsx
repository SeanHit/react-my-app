import React,{Component} from 'react'
import {
    Card,
    Table,
    Button,
    Icon,
    message,
    Modal
} from 'antd'
import LinkButton from "../../components/link-button";
import {reqCategorys,reaUpdateCategorys,reqAddCategorys} from '../../api/index'
import AddForm from './components/add-form'
import UpdateForm from './components/update-form'
/*
* 商品分类路由
* */

export default class Category extends Component{
    state = {
        loading:false,
        categorys: [],  //一级分类列表
        parentId : '0',   //当前需要显示的分类列表的parentId
        parentName: '', //当前需要显示的父分类名称
        subCategorys:[], //二级分类列表
        showModal:0,  //0表示对话框都不显示，1表示 添加对话框显示，2表示更新对话框显示
    }

    /*
    * 初始化所有列的数组
    * */
    initColumns=() =>{
      this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: '',
            },
            {
                title: '操作',
                dataIndex: '',
                key: '',
                width:'30%',
                render: (categry) => (
                    <div>
                        <LinkButton onClick={()=>this.showUpdateModal(categry)}>修改分类</LinkButton>
                        {/*如何向事件回调函数传递参数：
                            先定义一个匿名函数，在函数调用处理的函数并传递数据
                         */}
                        {
                            this.state.parentId ==='0'?<LinkButton onClick={()=>this.showSubCategorys(categry)}>查看子分类</LinkButton> :null
                        }

                    </div>
                )
            },

        ];
}

    showSubCategorys =(category,key) =>{
        console.log(category);
        this.setState({
            parentId:category._id,
            parentName:category.name,
        },()=>{
            // console.log("你好")
            console.log(this.state.parentId);
            this.getCategorys();
            console.log(this.state.subCategorys)
        })

}
    showFirstCategorys =()=>{
        this.setState({
            parentId :'0',
            parentName:'',
            subCategorys:[]
        })
}



    /*
    * 模态框的操作
    * */

    /*关闭模态框
    * */
    handleCancel=()=>{
        this.form.resetFields();
        this.setState({
            showModal:0,
        })
    }

    /*
    点击模态框，添加分类
    */
    addCategory = ()=>{
        this.form.validateFields(async(err)=>{
            if(!err){
                //    1.隐藏确定狂
                this.setState({
                    showModal:0,
                })
                const parentId =this.form.getFieldValue('parentId');
                const categoryName =this.form.getFieldValue('categoryName');
                console.log('parentId:',parentId);
                console.log('categoryName:',categoryName);
                this.form .resetFields();
                const result = await reqAddCategorys(parentId,categoryName);
                console.log('result:',result);
                if(result.status===0){
                    message.success('添加成功');
                    //添加的分类就是当前分类列表的父id
                    if(parentId === this.state.parentId){
                        this.getCategorys();
                    }else if(parentId==='0'){
                        //    在二级分类列表下面添加一级分类列表
                        this.getCategorys('0');
                    }
                }else{
                    message.error('添加失败，请稍后重试');
                }
            }
        })

    }
    //打开模态框
    showAddModal =()=>{
        this.setState({
            showModal:1,
        })
    }
    showUpdateModal =(category)=>{
        this.category =category;
        this.setState({
            showModal:2,
        })
    }

    /*
    点击模态框，更新分类
    */
    updateCategory = ()=>{
        this.form.validateFields(async (err)=>{
            if(!err){
                //    1.隐藏确定狂
                this.setState({
                    showModal:0,
                })
                const categoryId =this.category._id;
                //解决子组件向父组件传递属性
                console.log("categoryId:",categoryId);
                const categoryName= this.form.getFieldValue('categoryName');
                console.log("categoryName:",categoryName);

                //  重置所有的biaodan 项
                this.form .resetFields();

                //    2.发请求
                const result = await reaUpdateCategorys(categoryId,categoryName);
                if(result.status === 0){
                    //    成功
                    //    3.重新显示列表
                    message.success('修改成功');
                    this.getCategorys();
                }else{
                    message.error('修改失败,请稍后重试');
                }

            }
        })

    }



    /*获取一级或者二级列表显示
    * */
    getCategorys =async (parentId) =>{
        //setloading
        this.setState({
            loading:true
        })
        parentId =parentId || this.state.parentId;
        const result = await reqCategorys(parentId);
        this.setState({
            loading:false
        })
        if(result.status ===0){
            //可能是一级的也可能是二级的
            const categorys =result.data;
            if(parentId ==='0'){
                //跟新一级状态
                this.setState({
                    categorys: categorys
                })
            }else{  //更新二级分类状态
                this.setState({
                    subCategorys: categorys
                })
            }

        }else{
            message.error('一级列表获取失败');
        }
    }

    componentWillMount() {
        //初始化列的数组
        this.initColumns();
    }

    componentDidMount() {
    //    获取分类列表
        this.getCategorys();
    }

    render() {

        // 读取状态数据
        const {loading,categorys,subCategorys,parentId,parentName,showModal} =this.state;
        //读取指定分类
        const category =this.category || {};


        //卡片的左侧侧
        const title = parentId==='0'?'一级分类标题':(
            <span>
                <LinkButton onClick={()=>this.showFirstCategorys()}>一级分类列表</LinkButton>
                <Icon type={"arrow-right"} style={{marginRight:'5px'}}></Icon>
                <span>{parentName}</span>
            </span>
        );
        //右边的信息
        const extra= (
            <Button type={"primary"} onClick={this.showAddModal}>
                <Icon type={"plus"}></Icon>
                添加
            </Button>
        )
        return(
            <div>
                <Card title={title} extra={extra} >
                    <Table
                        dataSource={parentId==='0'? categorys:subCategorys}
                        columns={this.columns}
                        rowKey={'_id'}
                        loading={loading}
                        bordered={true}
                        pagination={{defaultPageSize:5,showQuickJumper:true}}
                    />
                </Card>
                <Modal
                    title="添加分类"
                    visible={showModal ===1?true:false}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm categorys={categorys} parentId={parentId} setForm={(form) =>{this.form=form}}/>
                </Modal>

                <Modal
                    title="修改分类"
                    visible={showModal ===2?true:false}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm categoryName={category.name} setForm={(form) =>{this.form=form}}/>
                </Modal>
            </div>
        )
    }
}