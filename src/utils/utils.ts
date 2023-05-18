import { BaseData, Country, League } from "../@types/utils";
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

    if (daysDiff >= 1) await saveDataToLocalStorage();
  }
}

export const getCountrisFromAPI = async (): Promise<Country[]> => {
  const countriesResponse = await fetch(BASE_URL + "/countries", {
    headers: getHeaders(), method: "GET", redirect: 'follow'
  });
  const countriesResponseJson = await countriesResponse?.json();
  return countriesResponseJson?.response;
}

export const getLeaguesFromAPI = async (): Promise<League[]> => {
  const leaguesResponse = await fetch(BASE_URL + "/leagues", {
    headers: getHeaders(), method: "GET", redirect: 'follow'
  });
  const leaguesResponseJson = await leaguesResponse?.json();
  return leaguesResponseJson?.response;
}

export const getSeasonsFromAPI = async (): Promise<number[]> => {
  const seasonsResponse = await fetch(BASE_URL + "/leagues/seasons", {
    headers: getHeaders(), method: "GET", redirect: 'follow'
  });
  const seasonsResponseJson = await seasonsResponse?.json();
  return seasonsResponseJson?.response;
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