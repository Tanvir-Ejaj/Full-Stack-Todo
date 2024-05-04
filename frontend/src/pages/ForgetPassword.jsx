import React, { useState } from "react";
import { Button, Form, Input, Col, Row, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ForgetPassword = () => {
  const [form] = Form.useForm();
  let [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  let params = useParams();
  let navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    let data = await axios.post(
      "http://localhost:8000/api/v1/auth/forgetpassword",
      {
        email: values.email,
      }
    );
    if (data.data.error == "User not found") {
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
      form.resetFields();
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      console.log("success");
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
                  labelCol={{
                    span: 6,
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
                    wrapperCol={{
                      offset: 4,
                      span: 8,
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
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ForgetPassword;
