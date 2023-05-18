import { Card, Form, Select } from "antd"
import { getCountriesFromLocalStorage, getLeaguesFromLocalStorage, getSeasonsFromLocalStorage } from "../utils/utils";
import { useMemo } from "react";
import { FiltersCardProps } from "../@types/FiltersCard";

export const FiltersCard = ({
  selectedCountry,
  handleSelectCountry,
  selectedLeague,
  handleSelectLeague,
  selectedSeason,
  handleSelectSeason
}: FiltersCardProps) => {
  const countries = getCountriesFromLocalStorage();
  const leagues = getLeaguesFromLocalStorage();
  const seasons = getSeasonsFromLocalStorage();

  const filteredLeagues = useMemo(() => {
    return leagues?.filter(league => league?.country?.name === selectedCountry)
  }, [leagues, selectedCountry])

  return <Card>
    <Form
      layout="inline"
    >
      <Form.Item
        label="País"
        name="country"
        style={{ width: 300 }}
      >
        <Select
          placeholder="Selecione um país"
          allowClear
          showSearch
          options={countries?.map(country => ({ label: country?.name, value: country?.name }))}
          onChange={handleSelectCountry}
          value={selectedCountry}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>

      <Form.Item
        label="Liga"
        name="league"
        style={{ width: 300 }}
      >
        <Select
          disabled={!selectedCountry}
          placeholder="Selecione uma liga"
          allowClear
          showSearch
          options={filteredLeagues?.map(league => ({ label: league?.league?.name, value: league?.league?.id }))}
          onChange={handleSelectLeague}
          value={selectedLeague}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>

      <Form.Item
        label="Temporada"
        name="season"
        style={{ width: 300 }}
      >
        <Select
          disabled={!selectedCountry || !selectedLeague}
          placeholder="Selecione uma temporada"
          allowClear
          showSearch
          options={seasons?.map(season => ({ label: season, value: season }))}
          onChange={handleSelectSeason}
          value={selectedSeason}
        />
      </Form.Item>
    </Form>
  </Card>
}