import React, {Component} from 'react';
import {Upload, Button, message, Icon, Alert, Input} from 'antd';

const limit = 1 * 1024 * 1024; 
class Uploader extends Component {
    constructor (props) {
        super(props);

        this.state = {
            imgUrl: '',
            fileList: []
        };

        this.uploadProps = {
            name: 'file',
            action: this.props.uploadUrl,
            withCredentials: true,
        // showUploadList: false,
            beforeUpload(file) {
                if (file.name && file.size) {
                    if (file.size > limit) {
                        message.error('上传失败，文件大小超过限制');
                        return false;
                    }
                }
            },
            onChange(info) {

                if (info.file.status === 'done') {
                    const r = info.file.response;


                    if (r.code && r.data && r.data.url) {                            
                        message.success(`${info.file.name} 上传成功。`);

                        const fileList = info.fileList.slice(-1);

                        me.setState({
                            imgUrl: r.data.url.replace('http://', '//'),
                            fileList
                        }, () => {
                            try {
                                document.querySelector('#J_uploadedImgUrl').select();
                            } catch (e) {
                            }
                        });
                    } else {                
                        message.error(`${info.file.name} 上传失败。`);
                    }

                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败。`);
                }
            }
        };
    }


    render () {
        return (
      <div>
          <Alert message="单张图片大小不能超过1M" type="info" />
          <Upload {...this.uploadProps}
          fileList={this.state.fileList}
          >
              <Button type="ghost">
                  <Icon type="upload" /> 点击上传
              </Button>
          </Upload>

          <Input type="url"
          ref="imgUrlInput"
          id="J_uploadedImgUrl"
          style={{
              marginTop: 10,
              visibility: this.state.imgUrl ? 'visible' : 'hidden'
          }}
          value={this.state.imgUrl}
          placeholder="图片地址"
          />
      </div>
        );
    }
}


export default Uploader;