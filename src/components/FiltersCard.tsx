import { Avatar, Card, Form, Select } from "antd"
import { getCountriesFromLocalStorage, getLeaguesFromLocalStorage, getSeasonsFromLocalStorage, getTeamsFromAPI } from "../utils/utils";
import { useEffect, useMemo, useState } from "react";
import { FiltersCardProps, Team } from "../@types/types";

export const FiltersCard = ({
  selectedCountry,
  handleSelectCountry,
  selectedLeague,
  handleSelectLeague,
  selectedSeason,
  handleSelectSeason,
  selectedTeam,
  handleSelectTeam,
}: FiltersCardProps) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loadingTeams, setLoadingTeams] = useState<boolean>(false);

  const countries = getCountriesFromLocalStorage();
  const leagues = getLeaguesFromLocalStorage();
  const seasons = getSeasonsFromLocalStorage();

  const filteredLeagues = useMemo(() => {
    return leagues?.filter(league => league?.country?.name === selectedCountry)
  }, [leagues, selectedCountry])

  useEffect(() => {
    if (selectedLeague && selectedSeason) {
      setLoadingTeams(true);
      getTeamsFromAPI(selectedLeague, selectedSeason).then(result => setTeams(result));
      setLoadingTeams(false);
    }
  }, [selectedLeague, selectedSeason])

  return <Card>
    <Form
      layout="inline"
    >
      <Form.Item
        label="País"
        name="country"
        style={{ width: 200 }}
      >
        <Select
          placeholder="Selecione um país"
          showSearch
          options={countries?.map(country => ({ label: country?.name, value: country?.name }))}
          onChange={handleSelectCountry}
          value={selectedCountry}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          suffixIcon={<Avatar size="small" src={countries?.find(cur => cur?.name === selectedCountry)?.flag} />}
        />
      </Form.Item>

      <Form.Item
        label="Liga"
        name="league"
        style={{ width: 200 }}
      >
        <Select
          disabled={!selectedCountry}
          placeholder="Selecione uma liga"
          showSearch
          options={filteredLeagues?.map(league => ({ label: league?.league?.name, value: league?.league?.id }))}
          onChange={handleSelectLeague}
          value={selectedLeague}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          suffixIcon={<Avatar size="small" src={filteredLeagues?.find(cur => cur?.league?.id === selectedLeague)?.league?.logo} />}
        />
      </Form.Item>

      <Form.Item
        label="Temporada"
        name="season"
        style={{ width: 200 }}
      >
        <Select
          disabled={!selectedCountry || !selectedLeague}
          placeholder="Selecione uma temporada"
          showSearch
          options={seasons?.map(season => ({ label: season, value: season }))}
          onChange={handleSelectSeason}
          value={selectedSeason}
        />
      </Form.Item>

      <Form.Item
        label="Time"
        name="team"
        style={{ width: 200 }}
      >
        <Select
          disabled={!selectedCountry || !selectedLeague || !selectedSeason}
          placeholder="Selecione um time"
          showSearch
          loading={loadingTeams}
          options={teams?.map(team => ({ label: team?.team?.name, value: team?.team?.id }))}
          onChange={handleSelectTeam}
          value={selectedTeam}
          suffixIcon={<Avatar size="small" src={teams?.find(cur => cur?.team?.id === selectedTeam)?.team?.logo} />}
        />
      </Form.Item>
    </Form>
  </Card>
}