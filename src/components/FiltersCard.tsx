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

  const filteredLeagues = useMemo(() => leagues?.filter(league => league?.country?.name === selectedCountry), [leagues, selectedCountry]);

  const selectedCountryLogo = useMemo(() => countries?.find(cur => cur?.name === selectedCountry)?.flag, [countries, selectedCountry]);
  const selectedLeagueLogo = useMemo(() => filteredLeagues?.find(cur => cur?.league?.id === selectedLeague)?.league?.logo, [filteredLeagues, selectedLeague]);
  const selectedTeamLogo = useMemo(() => teams?.find(cur => cur?.team?.id === selectedTeam)?.team?.logo, [teams, selectedTeam]);

  useEffect(() => {
    if (selectedLeague && selectedSeason) {
      setLoadingTeams(true);
      getTeamsFromAPI(selectedLeague, selectedSeason).then(result => setTeams(result));
      setLoadingTeams(false);
    }
  }, [selectedLeague, selectedSeason])

  return <Card style={{ maxWidth: 1300 }}>
    <Form
      layout="inline"
    >
      <Form.Item
        label="País"
        name="country"
      >
        <Select
          placeholder="Selecione um país"
          showSearch
          showArrow={false}
          options={countries?.map(country => ({ label: country?.name, value: country?.name }))}
          onChange={handleSelectCountry}
          value={selectedCountry}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          suffixIcon={selectedCountryLogo ? <Avatar size="small" src={selectedCountryLogo} /> : null}
        />
      </Form.Item>

      <Form.Item
        label="Liga"
        name="league"
      >
        <Select
          disabled={!selectedCountry}
          placeholder="Selecione uma liga"
          showSearch
          showArrow={false}
          options={filteredLeagues?.map(league => ({ label: league?.league?.name, value: league?.league?.id }))}
          onChange={handleSelectLeague}
          value={selectedLeague}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          suffixIcon={selectedLeagueLogo ? <Avatar size="small" src={selectedLeagueLogo} /> : null}
        />
      </Form.Item>

      <Form.Item
        label="Temporada"
        name="season"
        style={{ minWidth: 150 }}
      >
        <Select
          disabled={!selectedCountry || !selectedLeague}
          placeholder="Selecione uma temporada"
          showSearch
          showArrow={false}
          options={seasons?.map(season => ({ label: season, value: season }))}
          onChange={handleSelectSeason}
          value={selectedSeason}
        />
      </Form.Item>

      <Form.Item
        label="Time"
        name="team"
      >
        <Select
          disabled={!selectedCountry || !selectedLeague || !selectedSeason}
          placeholder="Selecione um time"
          showSearch
          showArrow={false}
          loading={loadingTeams}
          options={teams?.map(team => ({ label: team?.team?.name, value: team?.team?.id }))}
          onChange={handleSelectTeam}
          value={selectedTeam}
          suffixIcon={selectedTeamLogo ? <Avatar size="small" src={selectedTeamLogo} /> : null}
        />
      </Form.Item>
    </Form>
  </Card>
}