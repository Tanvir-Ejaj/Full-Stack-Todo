import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Col,
  Divider,
  Row,
  message,
  Space,
  Flex,
} from "antd";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const OtpVerfication = () => {
  const [form] = Form.useForm();
  let [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  let params = useParams();
  let navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    let data = await axios.post(
      "http://localhost:8000/api/v1/auth/otpverification",
      {
        email: params.email,
        otp: values.otp,
      }
    );
    if (data.data.error === "OTP Not Match") {
      form.resetFields();
      setLoading(false);
      messageApi.open({
        type: "error",
        content: data.data.error,
      });
    } else {
      form.resetFields();
      setLoading(false);
      messageApi.open({
        type: "success",
        content: data.data.success,
      });
      setTimeout(() => {
        navigate("/login");
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
                    label="OTP"
                    name="otp"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Flex justify="space-between">
                    <p>
                      I don't have an OTP. <Link to="/resendotp">Resend OTP</Link>
                    </p>
                    <Form.Item
                      wrapperCol={{
                        offset: 3,
                        span: 16,
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

export default OtpVerfication;
