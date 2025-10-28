import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js";
import { PokeAPI } from "./pokeAPI.js"
import { Cache } from "./pokecache.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export type State = {
    commandsRegistry: Record<string, CLICommand>,
    readLineInterface: Interface,
    pokeAPI: PokeAPI,
    locationAreaPrevUrl?: string,
    locationAreaNextUrl?: string,
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
    };

    return state;
}