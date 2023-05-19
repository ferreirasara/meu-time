export type FiltersCardProps = {
  selectedCountry: string
  handleSelectCountry: (country: string) => void
  selectedLeague: number
  handleSelectLeague: (league: number) => void
  selectedSeason: number
  handleSelectSeason: (season: number) => void
  selectedTeam: number
  handleSelectTeam: (team: number) => void
}