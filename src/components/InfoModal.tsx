import { Col, Divider, List, Modal, Row, Statistic, Typography } from "antd"
import { InfoModalProps, RequestData, UserData } from "../@types/types"
import { useState } from "react";

export const InfoModal = ({ infoModalOpen, onClose }: InfoModalProps) => {
  const [showBlur, setShowBlur] = useState<boolean>(true);
  const userDataString = localStorage.getItem('user-data');
  const requestsDataString = localStorage.getItem('requests-data');
  const userDataJson: UserData = JSON.parse(userDataString || "{}");
  const requestsDataJson: RequestData = JSON.parse(requestsDataString || "{}");
  const apiKey = localStorage.getItem('api-key')

  return <Modal
    open={infoModalOpen}
    onCancel={onClose}
    footer={null}
    title="Informações"
  >
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title="Requisições feitas" value={requestsDataJson?.current} />
        </Col>
        <Col span={12}>
          <Statistic title="Requisições disponíveis" value={requestsDataJson?.limitDay - requestsDataJson?.current} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col flex='auto'>
          <Divider>Usuário</Divider>
          <List>
            <List.Item>
              <Typography.Text strong>Nome</Typography.Text>: {userDataJson?.firstname} {userDataJson?.lastname}
            </List.Item>
            <List.Item>
              <Typography.Text strong>Email</Typography.Text>: {userDataJson?.email}
            </List.Item>
            <List.Item>
              <Typography.Text strong>API Key</Typography.Text>: <Typography.Text
                style={{ filter: `blur(${showBlur ? '0.15rem' : '0rem'})` }}
                onMouseEnter={() => setShowBlur(false)}
                onMouseLeave={() => setShowBlur(true)}
              >
                {apiKey}
              </Typography.Text>
            </List.Item>
          </List>
        </Col>
      </Row>
    </div>
  </Modal>
}