import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link, Redirect} from 'react-router-dom'
import { Upload, Icon, message, Row, Col, Button} from 'antd';
const Dragger = Upload.Dragger;
const props = {
  name: 'file',
  action: './upload',
  showUploadList:false,
}
class App extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
      data:[],
      redirect:''
    }; 
  }
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      this.setState({data:info.file.response.data, redirect:'Home'});
      
      // console.log(this.state.data); 
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  render(){
      let Home;
      if(this.state.redirect==='Home')
        Home = <Redirect to={{pathname:'/Home',state:{data:this.state.data}}} />;
    return(
    <div className="App">
      <header className="App-header">
        <Link to ='/App'><img src={logo} className="App-logo" alt="logo" /></Link>
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <br/><br/>
      <Row type="flex" justify="space-around" align="middle">
        <Col span={9}>
          <Dragger {...props} onChange={e=>this.onChange(e)}>
            <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for *.pcap file</p>
          </Dragger>
        </Col>
        <Col span={9}>
          <Link to='/Flow'><Button type="dashed" ghost size='large' className='btn'>即時偵測</Button></Link>
        </Col>
      </Row>
      <br/><br/>
      {Home}
    </div>
    )
  }
}

export default App;
