import React, { Component } from 'react';
import './Home.css'
import { Upload, Icon, message, Row, Col, Button, Table } from 'antd';

const Dragger = Upload.Dragger;
const props = {
  name: 'file',
  action: './upload',
  showUploadList:false,
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {data:[]};
    this.columns=[
      {
        title: 'Src IP',
        dataIndex: 'Src IP',
        key: 'Src IP',
      }, {
        title: 'Src Port',
        dataIndex: 'Src Port',
        key: 'Src Port',
      }, {
        title: 'Dst IP',
        dataIndex: 'Dst IP',
        key: 'Dst IP',
      }, {
        title: 'Dst Port',
        dataIndex: 'Dst Port',
        key: 'Dst Port',
      }, {
        title: 'Protocol',
        dataIndex: 'Protocol',
        key: 'Protocol',
      }, {
        title: 'Flow Duration',
        dataIndex: 'Flow Duration',
        key: 'Flow Duration',
      }, {
        title: 'Flow Byts/s',
        dataIndex: 'Flow Byts/s',
        key: 'Flow Byts/s',
      }, {
        title: 'Flow Pkts/s',
        dataIndex: 'Flow Pkts/s',
        key: 'Flow Pkts/s',
      }, {
        title: 'Flow IAT Mean',
        dataIndex: 'Flow IAT Mean',
        key: 'Flow IAT Mean',
      }, {
        title: 'Flow IAT Std',
        dataIndex: 'Flow IAT Std',
        key: 'Flow IAT Std',
      }, {
        title: 'Flow IAT Max',
        dataIndex: 'Flow IAT Max',
        key: 'Flow IAT Max',
      }, {
        title: 'Flow IAT Min',
        dataIndex: 'Flow IAT Min',
        key: 'Flow IAT Min',
      }, {
        title: 'Fwd IAT Mean',
        dataIndex: 'Fwd IAT Mean',
        key: 'Fwd IAT Mean',
      }, {
        title: 'Fwd IAT Std',
        dataIndex: 'Fwd IAT Std',
        key: 'Fwd IAT Std',
      }, {
        title: 'Fwd IAT Max',
        dataIndex: 'Fwd IAT Max',
        key: 'Fwd IAT Max',
      }, {
        title: 'Fwd IAT Min',
        dataIndex: 'Fwd IAT Min',
        key: 'Fwd IAT Min',
      }, {
        title: 'Bwd IAT Mean',
        dataIndex: 'Bwd IAT Mean',
        key: 'Bwd IAT Mean',
      }, {
        title: 'Bwd IAT Std',
        dataIndex: 'Bwd IAT Std',
        key: 'Bwd IAT Std',
      }, {
        title: 'Bwd IAT Max',
        dataIndex: 'Bwd IAT Max',
        key: 'Bwd IAT Max',
      }, {
        title: 'Bwd IAT Min',
        dataIndex: 'Bwd IAT Min',
        key: 'Bwd IAT Min',
      }, {
        title: 'Active Mean',
        dataIndex: 'Active Mean',
        key: 'Active Mean',
      }, {
        title: 'Active Std',
        dataIndex: 'Active Std',
        key: 'Active Std',
      }, {
        title: 'Active Max',
        dataIndex: 'Active Max',
        key: 'Active Max',
      }, {
        title: 'Active Min',
        dataIndex: 'Active Min',
        key: 'Active Min',
      }, {
        title: 'Idle Mean',
        dataIndex: 'Idle Mean',
        key: 'Idle Mean',
      }, {
        title: 'Idle Std',
        dataIndex: 'Idle Std',
        key: 'Idle Std',
      }, {
        title: 'Idle Min',
        dataIndex: 'Idle Min',
        key: 'Idle Min',
      }, {
        title: 'label',
        dataIndex: 'label',
        key: 'label',
      }];
    
    
  }
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
        }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      console.log(info.file.response.data);
      this.setState({data:info.file.response.data});
      // console.log(this.state.data);
      
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render(){
      return(
      <div>
        <br/><br/>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={9}>
            <Dragger {...props} onChange={e=>this.onChange(e)}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for *.pcap file</p>
            </Dragger>
          </Col>
          <Col span={9}>
            <Button type="dashed" ghost size='large' className='btn'>即時偵測</Button> 
          </Col>
        </Row>
        <br/><br/>
        <Table dataSource={this.state.data} columns={this.columns} />
      </div>
      );
  }
}
export default Home;
