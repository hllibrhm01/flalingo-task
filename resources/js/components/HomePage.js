import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Col, Layout, Row, Table } from 'antd';
import axios from 'axios';

function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.authenticateReducer.tasks);
  const [allTask, setAllTask] = useState([]);

  const getAllTasks = async () => {
    const response = await axios.get('/api/tasks');
    setAllTask(response.data.tasks);
  };


  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <Layout className="layout">
      <Row justify="center" align="middle">
        <Col span={12}>
          <Table
            rowKey={record => record.id}
            columns={[
              {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
              },
              {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
              },
              {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => (
                  <span>{record.status === 'pending' ? 'In Progress' : 'Completed'}</span>
                ),
              },
              {
                title: 'Due Date',
                dataIndex: 'due_date',
                key: 'due_date',
              },
              {
                title: 'Edit',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                  <NavLink to={`/edit-task/${record.id}`}>Edit</NavLink>
                ),
              },
              {
                title: 'Delete',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => ( 
                  <a>Delete</a>
                ),
                onCell: (record, rowIndex) => {
                  return {
                    onClick: async (event) => {
                      event.preventDefault();
                      await axios.delete(`/api/tasks/${record.id}`).then((response) => {  
                        getAllTasks();
                      });
                    },
                  };
                }
              }
            ]}
            dataSource={allTask}
          />
          <NavLink to="/create-task">Add New Task</NavLink>
        </Col>
      </Row>
    </Layout>
  );
}

export default Home;
