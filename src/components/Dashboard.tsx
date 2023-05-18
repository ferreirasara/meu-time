import '../style/Dashboard.scss';
import { useState } from "react";
import { FiltersCard } from "./FiltersCard";

export const Dashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [selectedSeason, setSelectedSeason] = useState<number>(0);


  const handleSelectCountry = (country: string) => setSelectedCountry(country);
  const handleSelectLeague = (league: string) => setSelectedLeague(league);
  const handleSelectSeason = (handleSelectSeason: number) => setSelectedSeason(handleSelectSeason);

  return <div className="dashboard-container">
    <FiltersCard
      selectedCountry={selectedCountry}
      handleSelectCountry={handleSelectCountry}
      selectedLeague={selectedLeague}
      handleSelectLeague={handleSelectLeague}
      selectedSeason={selectedSeason}
      handleSelectSeason={handleSelectSeason}
    />
  </div>;
}