import React, { useState } from "react";
import { Button, Form, Input, Col, Row, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);
    let data = await axios.post("http://localhost:8000/api/v1/auth/login", {
      email: values.email,
      password: values.password,
    });

    if (
      data.data.error === "Crendential Not Match" ||
      data.data.error === "user not found"
    ) {
      form.resetFields();
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
      setLoading(false);
      form.resetFields();
      setTimeout(() => {
        navigate("/todo");
      }, 3000);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      {/* {(successAlert && (
        <Alert message={successAlert} type="success" showIcon closable />
      )) ||
        (errorAlert && (
          <Alert message={errorAlert} type="error" showIcon closable />
        ))} */}
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
                      Login
                    </Button>
                  </Form.Item>
                  <Link to="/forgetpassword" className="forget">
                    Forget Password
                  </Link>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Login;
