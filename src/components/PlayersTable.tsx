import { Avatar, Divider, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"
import { getPlayersFromAPI } from "../utils/utils"
import { PlayersTableData, PlayersTableProps } from "../@types/types"

export const PlayersTable = ({
  selectedLeague,
  selectedSeason,
  selectedTeam,
  handleError,
}: PlayersTableProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<PlayersTableData[]>([]);

  useEffect(() => {
    if (selectedLeague && selectedSeason && selectedTeam) {
      setLoading(true);
      getPlayersFromAPI(selectedLeague, selectedSeason, selectedTeam)
        .then(result => setData((result)?.map(player => ({
          id: player?.player?.id,
          name: player?.player?.name,
          age: player?.player?.age,
          nationality: player?.player?.nationality,
          photo: player?.player?.photo,
        }))))
        .catch(e => handleError(e?.toString()))
      setLoading(false);
    }
  }, [selectedLeague, selectedSeason, selectedTeam, handleError])

  const columns: ColumnsType<PlayersTableData> = [
    {
      dataIndex: 'photo',
      key: 'photo',
      render: (photo) => <Avatar size="small" src={photo} />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Idade',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Nacionalidade',
      dataIndex: 'nationality',
      key: 'nationality',
    },
  ]

  return <div>
    <Divider>Jogadores</Divider>
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
      rowKey={'id'}
    />
  </div>
}