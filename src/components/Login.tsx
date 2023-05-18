import '../style/Login.scss';
import { Button, Card, Form, FormItemProps, Input } from 'antd';
import { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { getHeaders } from '../utils/utils';

export const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [validateStatus, setValidateStatus] = useState<FormItemProps["validateStatus"]>("");
  const [validateMessage, setValidadeMessage] = useState<string>("");

  const onLogin = async (values: { apiKey: string }) => {
    if (!values?.apiKey) {
      setValidateStatus("error");
      setValidadeMessage("Por favor informe sua API Key");
      return;
    }

    setLoading(true);
    setValidateStatus("validating");
    setValidadeMessage("");

    try {
      const response = await fetch(BASE_URL + "/status", {
        headers: getHeaders(values.apiKey),
        method: "GET",
        redirect: 'follow'
      });

      const responseJson = await response?.json();

      if (responseJson?.errors?.token) {
        setValidateStatus("error");
        setValidadeMessage("Sua API Key está incorreta. Verifique e tente novamente");
      } else {
        setValidateStatus("success");
        localStorage.setItem("api-key", values.apiKey);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return <div className="login-container">
    <Card>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        onFinish={onLogin}
      >
        <Form.Item
          label="API Key"
          name="apiKey"
          validateStatus={validateStatus}
          help={validateMessage}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </div>;
}