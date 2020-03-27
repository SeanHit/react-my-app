import React,{Component} from 'react'
import {
    Upload,
    Icon,
    Modal,
    message
} from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default  class PicturesWall extends React.Component {
    state = {
        previewVisible: false,  //标识大图
        previewImage: '',    //大图的url
        fileList: [          //图片数组对象

        ],
    };

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
    handleChange = ({ file,fileList }) => {

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