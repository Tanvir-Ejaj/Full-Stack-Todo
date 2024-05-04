import React, { useState } from "react";
import { Button, Form, Input, Col, Row, message, Flex } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  let [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    let data = await axios.post(
      "http://localhost:8000/api/v1/auth/registration",
      {
        name: values.username,
        email: values.email,
        password: values.password,
      },
      {
        headers: {
          Authorization: "tushar1122",
        },
      }
    );
    if (data.data.error === "email already in use") {
      messageApi.open({
        type: "error",
        content: data.data.error,
      });
      setLoading(false);
    } else {
      messageApi.open({
        type: "success",
        content: data.data.success,
      });
      form.resetFields();
      setLoading(false);
      console.log("success", data);
      setTimeout(() => {
        navigate(`/otpverification/${values.email}`);
      }, 3000);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Row justify="center" align="middle" className="main-box">
        <Col span={18}>
          <Row justify="center" align="middle">
            <Col span={8}>
              <div className="white-box">
                <Form
                  form={form}
                  name="basic"
                  layout="vertical"
                  labelCol={{
                    span: 8,
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
                  <Form.Item
                    label="Username"
                    name="username"
                    className="from-box"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
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
                    >
                      Submit
                    </Button>
                  </Form.Item>
                  <Flex justify="space-between" align="center">
                    <Link to="/login">Login</Link>
                    <Link to="/forgetpassword" className="forget">
                      Forget Password
                    </Link>
                  </Flex>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Registration;
