import { BarChartOutlined, LogoutOutlined } from "@ant-design/icons"
import { Button, Space, Typography, theme } from "antd"
import { Header } from "antd/lib/layout/layout"
import { useState } from "react";

export const AppHeader = () => {
  const [showBlur, setShowBlur] = useState<boolean>(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("api-key");
    window.location.reload();
  }

  const apiKey = localStorage.getItem('api-key');

  return <Header
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}
  >
    <Typography.Title
      level={2}
      style={{ margin: 0, color: colorBgContainer }}
    >
      <BarChartOutlined /> Meu Time
    </Typography.Title>
    <Space>
      <Typography.Text style={{ color: colorBgContainer }}>Sua API Key: </Typography.Text>
      <Typography.Text
        code
        style={{
          color: colorBgContainer,
          filter: `blur(${showBlur ? '0.15rem' : '0rem'})`
        }}
        onMouseEnter={() => setShowBlur(false)}
        onMouseLeave={() => setShowBlur(true)}
      >
        {apiKey}
      </Typography.Text>
      <Button
        type='default'
        ghost
        icon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Sair
      </Button>
    </Space>
  </Header>
}