import { LogoutOutlined } from "@ant-design/icons"
import { Button, Typography } from "antd"
import { Header } from "antd/es/layout/layout"

export const AppHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem("api-key");
    window.location.reload();
  }

  return <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Typography.Text type='success' strong>Meu Time</Typography.Text>
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