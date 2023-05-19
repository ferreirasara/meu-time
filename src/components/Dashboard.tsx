import { useState } from "react";
import { FiltersCard } from "./FiltersCard";
import { PlayersTable } from './PlayersTable';
import { GeneralStats } from './GeneralStats';
import { Col, Empty, Layout, Row, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { AppHeader } from './AppHeader';

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

  const showStats = !!selectedCountry && !!selectedLeague && !!selectedSeason && !!selectedTeam;

  return <Layout className="layout">
    <AppHeader />
    <Content style={{ padding: '16px 36px', background: colorBgContainer, display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 1300 }}>
        <Row>
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
        {showStats
          ? <div>
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
          </div>
          : <Empty
            style={{ margin: '16px' }}
            description="Selecione um time utilizando os filtros acima."
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        }
      </div>
    </Content>
  </Layout>
}