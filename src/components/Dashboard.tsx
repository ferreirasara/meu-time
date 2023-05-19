import { useEffect, useState } from "react";
import { FiltersCard } from "./FiltersCard";
import { PlayersTable } from './PlayersTable';
import { GeneralStats } from './GeneralStats';
import { Alert, Col, Empty, Layout, Row, Space, theme } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { AppHeader } from './AppHeader';
import { updateLocalStorageData } from "../utils/utils";

export const Dashboard = () => {
  const { token: { colorBgContainer } } = theme.useToken();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedLeague, setSelectedLeague] = useState<number>(0);
  const [selectedSeason, setSelectedSeason] = useState<number>(0);
  const [selectedTeam, setSelectedTeam] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [localStorageDataLoading, setLocalStorageDataLoading] = useState<boolean>(true);

  const handleSelectCountry = (country: string) => setSelectedCountry(country);
  const handleSelectLeague = (league: number) => setSelectedLeague(league);
  const handleSelectSeason = (season: number) => setSelectedSeason(season);
  const handleSelectTeam = (team: number) => setSelectedTeam(team);
  const handleError = (message: string) => setErrorMessage(message);

  const showStats = !!selectedCountry && !!selectedLeague && !!selectedSeason && !!selectedTeam;

  useEffect(() => {
    setLocalStorageDataLoading(true);
    updateLocalStorageData()
      .catch(e => setErrorMessage(e?.toString()))
      .then(() => setLocalStorageDataLoading(false));
  }, [])

  return <Layout className="layout">
    <AppHeader />
    <Content style={{ padding: '16px 36px', background: colorBgContainer, display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 1300 }}>
        <Space direction="vertical">
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
                handleError={handleError}
                localStorageDataLoading={localStorageDataLoading}
              />
            </Col>
          </Row>
          {errorMessage ? <Row>
            <Col flex='auto'>
              <Alert type="error" description={errorMessage} />
            </Col>
          </Row> : null}
          {showStats
            ? <div>
              <GeneralStats
                selectedLeague={selectedLeague}
                selectedSeason={selectedSeason}
                selectedTeam={selectedTeam}
                handleError={handleError}
              />
              <Row gutter={[16, 16]}>
                <Col flex="auto">
                  <PlayersTable
                    selectedLeague={selectedLeague}
                    selectedSeason={selectedSeason}
                    selectedTeam={selectedTeam}
                    handleError={handleError}
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
        </Space>
      </div>
    </Content>
  </Layout>
}