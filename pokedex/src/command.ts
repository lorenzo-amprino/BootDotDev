import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { CLICommand } from "./state.js";
import { commandCatch } from "./command_catch.js";
import { inspect } from "util";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {

    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Shows next 20 locations",
      callback: commandMap
    },
    mapb: {
      name: "mapb",
      description: "Shows previous 20 locations",
      callback: commandMapb
    },
    explore: {
      name: "explore",
      description: "Shows all pokemons in specified area",
      callback: commandExplore
    },
    catch: {
      name: "catch",
      description: "Throw a pokeball to catch a specified Pokemon",
      callback: commandCatch
    },
    inspect:{
      name: "inspect",
      description: "Shows infos about the specified pokemon",
      callback: commandInspect
    },
    pokedex:{
      name: "pokedex",
      description: "Shows infos about captured pokemons",
      callback: commandPokedex
    }
  };
}

