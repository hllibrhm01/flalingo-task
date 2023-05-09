import { useDispatch } from 'react-redux'
import actions from '../redux/Authenticate/actions';
import { Form, Input, Button, Row, Col, Layout, Select } from 'antd';
import { useHistory } from 'react-router-dom';

function CreateTask() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    dispatch({
      type: actions.CREATE_TASK,
      payload: { 'title': values.title, 'description': values.description, 'status': values.status, 'due_date': values.due_date },
    });
    history.push('/home');
  };

  return (
    <Layout className="layout">
      <Row justify="center" align="middle">
        <Col span={6}>
          <h2>Create Task</h2>
          <Form
            form={form}
            name="createTask"
            onFinish={onFinish}
          >
            <Form.Item
              name="title"
              validateTrigger="onSubmit"
              rules={[
                {
                  required: true,
                  message: 'Please input your Task Name!',
                },
              ]}
            >
              <Input size="large"
                placeholder="Task Name" />
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
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Create Task
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}

export default CreateTask;