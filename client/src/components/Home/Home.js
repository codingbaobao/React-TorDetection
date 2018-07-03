import React from 'react';
import { Table } from 'antd';
import columns from './table'

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
const Home = (props) => (

  <div>
    <Table dataSource={addKey(props.location.state.data)} pagination={{ pageSize: 9 }} rowKey='indexkey' columns={columns} />
  </div>
)

export default Home;
