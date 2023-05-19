import '../style/Dashboard.scss';
import { useState } from "react";
import { FiltersCard } from "./FiltersCard";
import { PlayersTable } from './PlayersTable';
import { GeneralStats } from './GeneralStats';
import { Col, Layout, Row, Typography, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

export const Dashboard = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedLeague, setSelectedLeague] = useState<number>(0);
  const [selectedSeason, setSelectedSeason] = useState<number>(0);
  const [selectedTeam, setSelectedTeam] = useState<number>(0);

  const handleSelectCountry = (country: string) => setSelectedCountry(country);
  const handleSelectLeague = (league: number) => setSelectedLeague(league);
  const handleSelectSeason = (handleSelectSeason: number) => setSelectedSeason(handleSelectSeason);
  const handleSelectTeam = (handleSelectTeam: number) => setSelectedTeam(handleSelectTeam);

  return <Layout className="layout">
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <Typography.Text type='success' strong>Meu Time</Typography.Text>
    </Header>
    <Content style={{ padding: '16px 36px', background: colorBgContainer }}>
      <Row gutter={[16, 16]}>
        <Col flex="auto">
          <FiltersCard
            selectedCountry={selectedCountry}
            handleSelectCountry={handleSelectCountry}
            selectedLeague={selectedLeague}
            handleSelectLeague={handleSelectLeague}
            selectedSeason={selectedSeason}
            handleSelectSeason={handleSelectSeason}
            selectedTeam={selectedTeam}
            handleSelectTeam={handleSelectTeam}
          />
        </Col>
      </Row>
      <GeneralStats
        selectedLeague={selectedLeague}
        selectedSeason={selectedSeason}
        selectedTeam={selectedTeam}
      />
      <Row gutter={[16, 16]}>
        <Col flex="auto">
          <PlayersTable
            selectedLeague={selectedLeague}
            selectedSeason={selectedSeason}
            selectedTeam={selectedTeam}
          />
        </Col>
      </Row>
    </Content>
  </Layout>
}