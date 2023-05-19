export type BaseData = {
  lastUpdated?: Date,
  countries?: Country[],
  leagues?: League[],
  seasons?: number[],
}

export type UserData = {
  email: string,
  firstname: string,
  lastname: string,
}

export type RequestData = {
  current: number,
  limitDay: number,
}

export type PlayersTableData = {
  id: number,
  name: string,
  age: number,
  nationality: string,
  photo: string,
}

export type PlayersTableProps = {
  selectedLeague: number
  selectedSeason: number
  selectedTeam: number
  handleError: (message: string) => void
}

export type GoalsChartProps = {
  data?: GeneralStatsData,
  loading: boolean,
}

export type GeneralStatsData = {
  totalDraws: number,
  totalPlayed: number,
  totalWins: number,
  totalLoses: number,
  mostUsedFormation: {
    formation: string,
    played: number,
  },
  goals: {
    against: {
      minute: {
        "0-15": { total: number, percentage: string },
        "16-30": { total: number, percentage: string },
        "31-45": { total: number, percentage: string },
        "46-60": { total: number, percentage: string },
        "61-75": { total: number, percentage: string },
        "76-90": { total: number, percentage: string },
        "91-105": { total: number, percentage: string },
        "106-120": { total: number, percentage: string }
      },
    },
    for: {
      minute: {
        "0-15": { total: number, percentage: string },
        "16-30": { total: number, percentage: string },
        "31-45": { total: number, percentage: string },
        "46-60": { total: number, percentage: string },
        "61-75": { total: number, percentage: string },
        "76-90": { total: number, percentage: string },
        "91-105": { total: number, percentage: string },
        "106-120": { total: number, percentage: string }
      },
    },
  }
}

export type GeneralStatsProps = {
  selectedLeague: number
  selectedSeason: number
  selectedTeam: number
  handleError: (message: string) => void
}

export type FiltersCardProps = {
  selectedCountry: string
  handleSelectCountry: (country: string) => void
  selectedLeague: number
  handleSelectLeague: (league: number) => void
  selectedSeason: number
  handleSelectSeason: (season: number) => void
  selectedTeam: number
  handleSelectTeam: (team: number) => void
  localStorageDataLoading: boolean
  handleError: (message: string) => void
}

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

export type Player = {
  player: {
    id: number,
    name: string,
    firstname: string,
    lastname: string,
    age: number,
    birth: {
      date: string,
      place: string,
      country: string,
    },
    nationality: string,
    height: string,
    weight: string,
    injured: boolean,
    photo: string,
  },
  // statistics: {
  //   "team": {
  //     "id": 147,
  //     "name": "Coritiba",
  //     "logo": "https://media-1.api-sports.io/football/teams/147.png"
  //   },
  //   "league": {
  //     "id": 71,
  //     "name": "Serie A",
  //     "country": "Brazil",
  //     "logo": "https://media-2.api-sports.io/football/leagues/71.png",
  //     "flag": "https://media-3.api-sports.io/flags/br.svg",
  //     "season": 2016
  //   },
  //   "games": {
  //     "appearences": 6,
  //     "lineups": 6,
  //     "minutes": 438,
  //     "number": null,
  //     "position": "Defender",
  //     "rating": null,
  //     "captain": false
  //   },
  //   "substitutes": {
  //     "in": 0,
  //     "out": 3,
  //     "bench": 0
  //   },
  //   "shots": {
  //     "total": null,
  //     "on": null
  //   },
  //   "goals": {
  //     "total": 0,
  //     "conceded": null,
  //     "assists": null,
  //     "saves": null
  //   },
  //   "passes": {
  //     "total": null,
  //     "key": null,
  //     "accuracy": null
  //   },
  //   "tackles": {
  //     "total": null,
  //     "blocks": null,
  //     "interceptions": null
  //   },
  //   "duels": {
  //     "total": null,
  //     "won": null
  //   },
  //   "dribbles": {
  //     "attempts": null,
  //     "success": null,
  //     "past": null
  //   },
  //   "fouls": {
  //     "drawn": null,
  //     "committed": null
  //   },
  //   "cards": {
  //     "yellow": 0,
  //     "yellowred": 0,
  //     "red": 0
  //   },
  //   "penalty": {
  //     "won": null,
  //     "commited": null,
  //     "scored": null,
  //     "missed": null,
  //     "saved": null
  //   }
  // }[]
}

export type TeamStats = {
  lineups: {
    formation: string,
    played: number
  }[],
  fixtures: {
    draws: { home: number, away: number, total: number }
    loses: { home: number, away: number, total: number },
    played: { home: number, away: number, total: number },
    wins: { home: number, away: number, total: number },
  },
  goals: {
    against: {
      minute: {
        "0-15": { total: number, percentage: string },
        "16-30": { total: number, percentage: string },
        "31-45": { total: number, percentage: string },
        "46-60": { total: number, percentage: string },
        "61-75": { total: number, percentage: string },
        "76-90": { total: number, percentage: string },
        "91-105": { total: number, percentage: string },
        "106-120": { total: number, percentage: string }
      },
    },
    for: {
      minute: {
        "0-15": { total: number, percentage: string },
        "16-30": { total: number, percentage: string },
        "31-45": { total: number, percentage: string },
        "46-60": { total: number, percentage: string },
        "61-75": { total: number, percentage: string },
        "76-90": { total: number, percentage: string },
        "91-105": { total: number, percentage: string },
        "106-120": { total: number, percentage: string }
      },
    },
  }
}

export type InfoModalProps = {
  infoModalOpen: boolean
  onClose: () => void
}