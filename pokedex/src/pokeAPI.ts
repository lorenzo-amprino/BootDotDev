import { Cache  } from "./pokecache";
import { type CacheEntry } from "./pokecache";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache: Cache ;

  constructor(cache: Cache ) {
    this.cache = cache;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;
    let cachedLocation = this.cache.get<ShallowLocations>(url);
    if (cachedLocation != undefined) {
      return cachedLocation;
    } else {
      const res = await fetch(url);
      const locations = res.json();
      this.cache.add(url, locations);
      return locations;
    }
  }

  //async fetchLocation(locationName: string): Promise<Location> {
  // implement this
  //}
}

export type ShallowLocations = {
  next: string,
  previous: string,
  results: {
    name: string,
    url: string
  }[],
};

export type Location = {
  name: string,
  url: string
};