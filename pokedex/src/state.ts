import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js";
import { PokeAPI, Pokemon } from "./pokeAPI.js"
import { Cache } from "./pokecache.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    commandsRegistry: Record<string, CLICommand>,
    readLineInterface: Interface,
    pokeAPI: PokeAPI,
    locationAreaPrevUrl?: string,
    locationAreaNextUrl?: string,
    pokedex: Record<string, Pokemon>
}

export function initState(cache: Cache): State {
    const state: State = {
        readLineInterface: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex ",
        }),
        commandsRegistry: getCommands(),
        pokeAPI: new PokeAPI(cache),
        pokedex: {}
    };

    return state;
}