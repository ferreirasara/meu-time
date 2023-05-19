import { BaseData, Country, League, Player, Team, TeamStats } from "../@types/types";
import { BASE_URL } from "./constants";

export const getHeaders = (apiKey?: string) => {
  if (!apiKey) apiKey = localStorage.getItem('api-key') || "";

  return {
    "x-apisports-key": apiKey,
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": "v3.football.api-sports.io"
  }
}

export const saveDataToLocalStorage = async () => {
  const countries: Country[] = await getCountrisFromAPI();
  const leagues: League[] = await getLeaguesFromAPI();
  const seasons: number[] = await getSeasonsFromAPI();

  const baseData: BaseData = {
    lastUpdated: new Date(),
    countries,
    leagues,
    seasons,
  }

  localStorage.setItem('base-data', JSON.stringify(baseData));
}

export const updateLocalStorageData = async () => {
  const baseDataString = localStorage.getItem('base-data');

  if (!baseDataString) {
    await saveDataToLocalStorage();
  } else {
    const baseDataJson: BaseData = JSON.parse(baseDataString);
    const lastUpdated = new Date(baseDataJson?.lastUpdated || "");
    const now = new Date();

    var timeDiff = lastUpdated.getTime() - now.getTime();
    var daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff >= 1 || !baseDataJson?.countries?.length || !baseDataJson?.leagues?.length || !baseDataJson?.seasons?.length) {
      await saveDataToLocalStorage();
    }
  }
}

export const getCountrisFromAPI = async (): Promise<Country[]> => {
  const countriesResponse = await fetch(BASE_URL + "/countries", {
    headers: getHeaders(), method: "GET", redirect: 'follow'
  });
  const countriesResponseJson = await countriesResponse?.json();
  const errors = countriesResponseJson?.errors;
  if (errors?.token || errors?.requests) {
    throw new Error(errors?.token || errors?.requests);
  }
  return countriesResponseJson?.response;
}

export const getLeaguesFromAPI = async (): Promise<League[]> => {
  const leaguesResponse = await fetch(BASE_URL + "/leagues", {
    headers: getHeaders(), method: "GET", redirect: 'follow'
  });
  const leaguesResponseJson = await leaguesResponse?.json();
  const errors = leaguesResponseJson?.errors;
  if (errors?.token || errors?.requests) {
    throw new Error(errors?.token || errors?.requests);
  }
  return leaguesResponseJson?.response;
}

export const getSeasonsFromAPI = async (): Promise<number[]> => {
  const seasonsResponse = await fetch(BASE_URL + "/leagues/seasons", {
    headers: getHeaders(), method: "GET", redirect: 'follow'
  });
  const seasonsResponseJson = await seasonsResponse?.json();
  const errors = seasonsResponseJson?.errors;
  if (errors?.token || errors?.requests) {
    throw new Error(errors?.token || errors?.requests);
  }
  return seasonsResponseJson?.response;
}

export const getTeamsFromAPI = async (leagueId: number, season: number): Promise<Team[]> => {
  const teamsResponse = await fetch(BASE_URL + `/teams?league=${leagueId}&season=${season}`, {
    headers: getHeaders(), method: "GET", redirect: 'follow'
  });
  const teamsResponseJson = await teamsResponse?.json();
  const errors = teamsResponseJson?.errors;
  if (errors?.token || errors?.requests) {
    throw new Error(errors?.token || errors?.requests);
  }
  return teamsResponseJson?.response;
}

export const getPlayersFromAPI = async (leagueId: number, season: number, teamId: number): Promise<Player[]> => {
  const playersResponse = await fetch(BASE_URL + `/players?league=${leagueId}&season=${season}&team=${teamId}`, {
    headers: getHeaders(), method: "GET", redirect: 'follow'
  });
  const playersResponseJson = await playersResponse?.json();
  const errors = playersResponseJson?.errors;
  if (errors?.token || errors?.requests) {
    throw new Error(errors?.token || errors?.requests);
  }
  return playersResponseJson?.response;
}

export const getGeneralStatsFromAPI = async (leagueId: number, season: number, teamId: number): Promise<TeamStats> => {
  const playersResponse = await fetch(BASE_URL + `/teams/statistics?league=${leagueId}&season=${season}&team=${teamId}`, {
    headers: getHeaders(), method: "GET", redirect: 'follow'
  });
  const playersResponseJson = await playersResponse?.json();
  return playersResponseJson?.response;
}

export const getBaseDataFromLocalStorage = (): BaseData | undefined => {
  const baseDataString = localStorage.getItem('base-data');
  if (!baseDataString) return undefined
  return JSON.parse(baseDataString);
}

export const getCountriesFromLocalStorage = (): Country[] => {
  const baseDataJson = getBaseDataFromLocalStorage();
  return baseDataJson?.countries || [];
}

export const getLeaguesFromLocalStorage = (): League[] => {
  const baseDataJson = getBaseDataFromLocalStorage();
  return baseDataJson?.leagues || [];
}

export const getSeasonsFromLocalStorage = (): number[] => {
  const baseDataJson = getBaseDataFromLocalStorage();
  return baseDataJson?.seasons || [];
}