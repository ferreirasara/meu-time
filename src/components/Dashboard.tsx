import '../style/Dashboard.scss';
import { useState } from "react";
import { FiltersCard } from "./FiltersCard";

export const Dashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedLeague, setSelectedLeague] = useState<number>(0);
  const [selectedSeason, setSelectedSeason] = useState<number>(0);
  const [selectedTeam, setSelectedTeam] = useState<number>(0);

  const handleSelectCountry = (country: string) => setSelectedCountry(country);
  const handleSelectLeague = (league: number) => setSelectedLeague(league);
  const handleSelectSeason = (handleSelectSeason: number) => setSelectedSeason(handleSelectSeason);
  const handleSelectTeam = (handleSelectTeam: number) => setSelectedTeam(handleSelectTeam);

  return <div className="dashboard-container">
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
  </div>;
}