import { Button, Card, Form, FormItemProps, Input, Typography, theme } from 'antd';
import { useState } from 'react';
import { getStatusFromAPI } from '../utils/utils';
import { BarChartOutlined, LoginOutlined } from '@ant-design/icons';
import { RequestData, UserData } from '../@types/types';

export const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [validateStatus, setValidateStatus] = useState<FormItemProps["validateStatus"]>("");
  const [validateMessage, setValidadeMessage] = useState<string>("");
  const {
    token: { colorBgContainerDisabled },
  } = theme.useToken();

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
      const responseJson = await getStatusFromAPI(values.apiKey);

      if (!!responseJson?.response?.account) {
        const userData: UserData = {
          email: responseJson?.response?.account?.email,
          firstname: responseJson?.response?.account?.firstname,
          lastname: responseJson?.response?.account?.lastname,
        }
        const requestData: RequestData = {
          current: responseJson?.response?.requests?.current,
          limitDay: responseJson?.response?.requests?.limit_day,
        }
        setValidateStatus("success");
        localStorage.setItem("api-key", values.apiKey);
        localStorage.setItem("user-data", JSON.stringify(userData));
        localStorage.setItem('requests-data', JSON.stringify(requestData));
        window.location.reload();
      } else {
        setValidateStatus("error");
        setValidadeMessage("Sua API Key está incorreta. Verifique e tente novamente");
      }

    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return <div
    className="login-container"
    style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorBgContainerDisabled,
    }}
  >
    <Card
      title={
        <Typography.Title
          level={2}
          style={{ textAlign: 'center' }}
        >
          <BarChartOutlined /> Meu Time
        </Typography.Title>
      }
      bordered
    >
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<LoginOutlined />}
            block
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      <div>
        <Typography.Text>
          Você pode obter uma key clicando <Typography.Link href='https://dashboard.api-football.com/register' target='_blank'>aqui</Typography.Link>.
        </Typography.Text>
      </div>
    </Card>
  </div>;
}