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

  async fetchLocation(locationName: string): Promise<LocationDetail> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    let cachedLocationDetail = this.cache.get<LocationDetail>(url);
    if (cachedLocationDetail != undefined) {
      return cachedLocationDetail;
    } else {
      const res = await fetch(url);
      const locationDetail = res.json();
      this.cache.add(url, locationDetail);
      return locationDetail;
    }
  }

  async fetchPokemon(pokemon: string): Promise<Pokemon> {
      const url = `${PokeAPI.baseURL}/pokemon/${pokemon}`;
      let cachedPokemon = this.cache.get<Pokemon>(url);
    if (cachedPokemon != undefined) {
      return cachedPokemon;
    } else {
      const res = await fetch(url);
      const pokemon = res.json();
      this.cache.add(url, pokemon);
      return pokemon;
    }
  }
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

export type LocationDetail = {
  name: string,
  pokemon_encounters: {pokemon: Pokemon}[];
};

export type Pokemon = {
  name: string,
  base_experience?: number,
  url?: string,
}