export type Team = {
  team: {
    id: number,
    name: string,
    code: string,
    country: string,
    founded: number,
    national: boolean,
    logo: string,
  },
  venue: {
    id: number,
    name: string,
    address: string,
    city: string,
    capacity: number,
    surface: string,
    image: string,
  },
}

export type Country = {
  name: string,
  code?: string,
  flag?: string,
}

export type League = {
  country: Country,
  league: {
    id: number,
    name: string,
    type: string,
    logo: string,
  }
  seasons: {
    year: number,
    start: string,
    end: string,
    current: boolean,
    coverage: {
      fixtures: {
        events: boolean,
        lineups: boolean,
        statistics_fixtures: boolean,
        statistics_players: boolean
      },
      standings: boolean,
      players: boolean,
      top_scorers: boolean,
      top_assists: boolean,
      top_cards: boolean,
      injuries: boolean,
      predictions: boolean,
      odds: boolean
    }
  }[],
}