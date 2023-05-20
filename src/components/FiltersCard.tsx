import { Avatar, Card, Form, Select } from "antd"
import { getCountriesFromLocalStorage, getLeaguesFromLocalStorage, getSeasonsFromLocalStorage, getTeamsFromAPI } from "../utils/utils";
import { useEffect, useMemo, useState } from "react";
import { FiltersCardProps, Team } from "../@types/types";
import { LoadingOutlined } from "@ant-design/icons";
import useCheckMobileScreen from "../hooks/useCheckMobileScreen";

const getSuffixIcon = (src?: string, loading?: boolean) => {
  if (loading) {
    return <LoadingOutlined />
  } else if (src) {
    return <Avatar size="small" src={src} />
  } else {
    return null
  }
}

export const FiltersCard = ({
  selectedCountry,
  handleSelectCountry,
  selectedLeague,
  handleSelectLeague,
  selectedSeason,
  handleSelectSeason,
  selectedTeam,
  handleSelectTeam,
  localStorageDataLoading,
  handleError,
}: FiltersCardProps) => {
  const isMobile = useCheckMobileScreen();
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
      getTeamsFromAPI(selectedLeague, selectedSeason)
        .then(result => setTeams(result))
        .catch(e => handleError(e?.toString()));
      setLoadingTeams(false);
    }
  }, [selectedLeague, selectedSeason, handleError])

  return <Card style={{ maxWidth: 1300 }}>
    <Form
      layout={isMobile ? "vertical" : "inline"}
    >
      <Form.Item
        label="País"
        name="country"
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
          suffixIcon={getSuffixIcon(selectedCountryLogo, localStorageDataLoading)}
          style={{ width: isMobile ? "100%" : 150 }}
          loading={localStorageDataLoading}
          disabled={localStorageDataLoading}
          data-testid="select-country"
        />
      </Form.Item>

      <Form.Item
        label="Liga"
        name="league"
      >
        <Select
          disabled={!selectedCountry || localStorageDataLoading}
          placeholder="Selecione uma liga"
          showSearch
          options={filteredLeagues?.map(league => ({ label: league?.league?.name, value: league?.league?.id }))}
          onChange={handleSelectLeague}
          value={selectedLeague}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          suffixIcon={getSuffixIcon(selectedLeagueLogo, localStorageDataLoading)}
          style={{ width: isMobile ? "100%" : 150 }}
          loading={localStorageDataLoading}
          data-testid="select-league"
        />
      </Form.Item>

      <Form.Item
        label="Temporada"
        name="season"
      >
        <Select
          disabled={!selectedCountry || !selectedLeague || localStorageDataLoading}
          placeholder="Selecione uma temporada"
          showSearch
          options={seasons?.map(season => ({ label: season, value: season }))}
          onChange={handleSelectSeason}
          value={selectedSeason}
          style={{ width: isMobile ? "100%" : 150 }}
          loading={localStorageDataLoading}
          data-testid="select-season"
        />
      </Form.Item>

      <Form.Item
        label="Time"
        name="team"
      >
        <Select
          disabled={!selectedCountry || !selectedLeague || !selectedSeason || loadingTeams || localStorageDataLoading}
          placeholder="Selecione um time"
          showSearch
          loading={loadingTeams || localStorageDataLoading}
          options={teams?.map(team => ({ label: team?.team?.name, value: team?.team?.id }))}
          onChange={handleSelectTeam}
          value={selectedTeam}
          suffixIcon={getSuffixIcon(selectedTeamLogo, (loadingTeams || localStorageDataLoading))}
          style={{ width: isMobile ? "100%" : 150 }}
          data-testid="select-team"
        />
      </Form.Item>
    </Form>
  </Card>
}