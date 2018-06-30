import React from 'react';
import {Table} from 'antd';
import columns from './table1'

const Home = (props) => (
  <div>
    <Table dataSource={props.location.state.data} columns={columns} />
  </div>
);
export default Home;
