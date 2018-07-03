import React, { Component } from 'react';
import { Table } from 'antd';
import columns from './table'
import './Flow.css'

const addKey = (datas) => {
  let newDatas = datas.map(
    (data, index) => {
      data.indexkey = index;
      // data add a new property
      return data;
    }
  );
  return newDatas;
}
class Flow extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this)
    this.state = {
      step: 0,
      data: [],
    };
  }
  getData() {
    fetch(`/realtime/${this.state.step}`, { method: 'GET' })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            step: this.state.step + 1,
            data: result.data.concat(this.state.data)
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => { this.setState({ error }); }
      )
    // console.log(this.state.data)
  }
  componentDidMount() {
    console.log(this.state.step)
    this.interval = setInterval(() => this.getData(), 12000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        <Table dataSource={addKey(this.state.data)} pagination={{ pageSize: 9 }} rowKey='indexkey' columns={columns} />
      </div>
    )
  }
}

export default Flow;
