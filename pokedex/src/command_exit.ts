import { State } from "./state";

export async function commandExit(state: State): Promise<void> {
    console.log("Closing the Pokedex... Goodbye!");

    state.readLineInterface.close();
    process.exit(0);
};