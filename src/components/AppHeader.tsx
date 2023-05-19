import { BarChartOutlined, InfoOutlined, LogoutOutlined } from "@ant-design/icons"
import { Button, Space, Typography, theme } from "antd"
import { Header } from "antd/lib/layout/layout"
import { useState } from "react";
import { InfoModal } from "./InfoModal";

export const AppHeader = () => {
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("api-key");
    localStorage.removeItem("user-data");
    localStorage.removeItem("requests-data");
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
    <Space>
      <Button
        ghost
        icon={<InfoOutlined />}
        onClick={() => setInfoModalOpen(true)}
      >
        Informações
      </Button>
      <Button
        ghost
        icon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Sair
      </Button>
    </Space>
    <InfoModal
      infoModalOpen={infoModalOpen}
      onClose={() => setInfoModalOpen(false)}
    />
  </Header>
}