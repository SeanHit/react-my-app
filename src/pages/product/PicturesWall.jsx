import React,{Component} from 'react'
import {
    Upload,
    Icon,
    Modal,
    message
} from 'antd';

import PropTypes  from 'prop-types'
import {reqDeleteImg} from '../../api/index'
import {IMAGES_BASE_URL} from '../../utils/constantValues'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default  class PicturesWall extends React.Component {

    static propTypes ={
        imgs:PropTypes.array,
    }

    constructor(props){
        super(props);

        let fileList =[];
        const {imgs} =this.props;

        if(imgs && imgs.length >0){
            fileList =imgs.map((curr,index) =>({
                uid :-index,
                name:curr,
                url : IMAGES_BASE_URL+'/'+curr,
            }))
        }

        this.state ={
            previewVisible: false,  //标识大图
            previewImage: '',    //大图的url
            //默认是一空数组
            fileList   //所有已经上传图片的数组
        }
    }


    getImages =()=>{
        const fileList =this.state.fileList;
        return fileList.map(curr=>curr.name);
}

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    //fileList：已经上传的地址
    //file:当前操作的图片文件
    handleChange = async({ file,fileList }) => {

        console.log('handleChange',file,fileList);

        //上传成功，将当前上传的file来修正（name,url）;
        if(file.status ==='done'){
            const result =file.response;
            if(result.status ==0){     //上传成功
                message.success('图片上传成功');
                const {name ,url} =result.data;
                console.log( 'name',name,url)
                file =fileList[fileList.length-1];
                file.name =name;
                file.url =url;
            }else{    //上传失败
                message.error('图片上传失败，请稍后重试')

            }
        }else if(file.status ==='removed'){  //删除图片
            const result = await reqDeleteImg(file.name);
            if(result.status === 0){
                message.success('删除图片成功');
            }else{
                message.error('删除图片失败');
            }
        }

        //不断的更新filelest的状态

        this.setState({ fileList });
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div >
                <Upload
                    action="/manage/img/upload"    //上传图片的接口地址
                    listType="picture-card"        //上传列表的样式
                    accept={'image/*'}               //文件类型
                    name ={'image'}                //请求参数名，默认file
                    fileList={fileList}              //已上传文件的列表
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}