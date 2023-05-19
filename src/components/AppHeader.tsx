import { BarChartOutlined, LogoutOutlined } from "@ant-design/icons"
import { Button, Typography, theme } from "antd"
import { Header } from "antd/es/layout/layout"

export const AppHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("api-key");
    window.location.reload();
  }

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
    <Button
      type='default'
      ghost
      icon={<LogoutOutlined />}
      onClick={handleLogout}
    >
      Sair
    </Button>
  </Header>
}