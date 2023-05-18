export type FiltersCardProps = {
  selectedCountry: string
  handleSelectCountry: (country: string) => void
  selectedLeague: string
  handleSelectLeague: (league: string) => void
  selectedSeason: number
  handleSelectSeason: (season: number) => void
}