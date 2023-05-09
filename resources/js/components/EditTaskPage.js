import { useDispatch } from 'react-redux'
import actions from '../redux/Authenticate/actions';
import { Form, Input, Button, Row, Col, Layout, Select } from 'antd';
import { useHistory, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EditTask() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [task, setTask] = useState([]);

  const onFinish = (values) => {
    dispatch({
      type: actions.EDIT_TASK,
      payload: { 'id': values.id, 'title': values.title, 'description': values.description, 'status': values.status, 'due_date': values.due_date },
    });
    alert('Task Updated Successfully');
  };

  const getTask = async () => {
    let id = window.location.pathname.split('/')[2];
    const response = await axios.get(`/api/tasks/${id}`);
    return response.data.task;
  }

  useEffect(() => {
    getTask().then(response => {
      setTask(response);
      form.setFieldsValue({
        id: response.id,
        title: response.title,
        description: response.description,
        status: response.status,
        due_date: response.due_date,
      });
    });
  }, []);

  return (
    <Layout className="layout">
      <Row justify="center" align="middle">
        <Col span={6}>
          <h2>Edit Task</h2>
          <Form
            form={form}
            name="editTask"
            onFinish={onFinish}>
            <Form.Item name="id" initialValue={task.id} hidden >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              name="title"
              validateTrigger="onSubmit"
              rules={[
                {
                  required: true,
                  message: 'Please input your Task Name!',
                },
              ]}>
              <Input size="large"
                placeholder="Task Name"
                value={task.title}
              />
            </Form.Item>
            <Form.Item
              name="description"
              validateTrigger="onSubmit"
              rules={[
                {
                  required: true,
                  message: 'Please input your Task Description!',
                },
              ]}
            >
              <Input
                size="large"
                type="text"
                placeholder="Task Description"
                value={task.description}
              />
            </Form.Item>
            <Form.Item
              name="status"
              validateTrigger="onSubmit"
              rules={[
                {
                  required: true,
                  message: 'Please select your Task Status!',
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Task Status"
                value={task.status}
              >
                <Select.Option value="pending">In Progress</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="due_date"
              validateTrigger="onSubmit"
              rules={[
                {
                  required: true,
                  message: 'Please input your Task Due Date!',
                },
              ]}
            >
              <Input
                size="large"
                type="date"
                placeholder="Task Due Date"
                value={task.due_date}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Edit Task
            </Button>
            <NavLink to="/home">Back</NavLink>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}

export default EditTask;