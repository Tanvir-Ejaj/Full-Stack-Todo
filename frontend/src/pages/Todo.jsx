import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  message,
  Flex,
  Radio,
  Space,
  Table,
  Tag,
} from "antd";
import axios from "axios";
import {
  PlusOutlined,
  ShoppingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
<link
  href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
  rel="stylesheet"
></link>;

const Todo = () => {
  const [form] = Form.useForm();
  let [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);
    let data = await axios.post("http://localhost:8000/api/v1/todo/addtask", {
      name: values.taskname,
      description: values.description,
    });
    if (data.data.error === `This Task is Pending`) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: data.data.error,
      });
    } else {
      messageApi.open({
        type: "success",
        content: data.data.success,
      });
      setLoading(false);
      form.resetFields();
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let [taskList, setTaskList] = useState([]);

  useEffect(() => {
    async function allcategory() {
      let data = await axios.get(
        "http://localhost:8000/api/v1/todo/viewalltask"
      );

      let allTaskData = [];

      data.data.map((item) => {
        allTaskData.push({
          key: item._id,
          name: item.name,
          description: item.description,
        });
      });
      setTaskList(allTaskData);
    }
    allcategory();
  }, []);

  const dataSource = [];

  const fixedColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <DeleteOutlined />,
    },
  ];

  return (
    <>
      {contextHolder}
      <Row justify="center" align="middle" className="main-box">
        <Col span={21}>
          <Row justify="center" align="middle">
            <Col span={8}>
              <div className="white-box">
                <div className="profile-pic"></div>
                <Row justify="center">
                  <Col span={24}>
                    <div className="big-circle">
                      <ShoppingOutlined />
                    </div>
                    <div className="header-text">
                      <h2>List of Taks</h2>
                      <p>Facilite sua ida ao supermercado!</p>
                    </div>
                  </Col>
                </Row>
                <Form
                  form={form}
                  name="basic"
                  layout="vertical"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Flex justify="space-between" align="end">
                    <Form.Item
                      label="Task"
                      name="taskname"
                      rules={[
                        {
                          required: true,
                          message: "Please input Todo Name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Please Write Desciption!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 0,
                        span: 24,
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={loading}
                        className="add-button"
                      >
                        <PlusOutlined />
                      </Button>
                    </Form.Item>
                  </Flex>
                </Form>
                <div className="table-area">
                  <Table
                    dataSource={taskList}
                    columns={fixedColumns}
                    pagination={false}
                    scroll={{
                      x: 300,
                      y: 100,
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Todo;
