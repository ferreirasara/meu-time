import { Col, Divider, List, Row, Typography } from "antd"
import { useEffect, useState } from "react";
import { getGeneralStatsFromAPI } from "../utils/utils";
import { GoalsChart } from "./GoalsChart";
import { GeneralStatsData, GeneralStatsProps } from "../@types/types";

export const GeneralStats = ({
  selectedLeague,
  selectedSeason,
  selectedTeam,
  handleError,
}: GeneralStatsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<GeneralStatsData>();

  useEffect(() => {
    if (selectedLeague && selectedSeason && selectedTeam) {
      setLoading(true);
      getGeneralStatsFromAPI(selectedLeague, selectedSeason, selectedTeam)
        .then(result => setData(({
          goals: result.goals,
          mostUsedFormation: {
            formation: result?.lineups?.[0]?.formation,
            played: result?.lineups?.[0]?.played,
          },
          totalDraws: result?.fixtures?.draws?.total,
          totalLoses: result?.fixtures?.loses?.total,
          totalPlayed: result?.fixtures?.played?.total,
          totalWins: result?.fixtures?.wins?.total,
        })))
        .catch(e => handleError(e?.toString()))
      setLoading(false);
    }
  }, [selectedLeague, selectedSeason, selectedTeam, handleError])

  return <Row gutter={[16, 16]}>
    <Col span={12}>
      <div>
        <Divider>Estatísticas Gerais</Divider>
        <List bordered loading={loading}>
          <List.Item>
            <Typography.Text strong>Formação mais utilizada</Typography.Text>: {data?.mostUsedFormation?.formation} (usada {data?.mostUsedFormation?.played} vezes)
          </List.Item>
          <List.Item>
            <Typography.Text strong>Total de jogos</Typography.Text>: {data?.totalPlayed}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Total de vitórias</Typography.Text>: {data?.totalWins}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Total de derrotas</Typography.Text>: {data?.totalLoses}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Total de empates</Typography.Text>: {data?.totalDraws}
          </List.Item>
        </List>
      </div>
    </Col>
    <Col span={12}>
      <GoalsChart
        data={data}
        loading={loading}
      />
    </Col>
  </Row>
}