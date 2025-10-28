import { State } from "./state";

export async function commandHelp(state: State): Promise<void> {

    console.log(`Welcome to the Pokedex!
Usage:
`)
    for (let commandName in state.commandsRegistry) {
        const command = state.commandsRegistry[commandName];
        console.log(`${command.name}: ${command.description}`);
    }
};