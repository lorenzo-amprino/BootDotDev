import { State } from "./state";

export async function commandExplore(state: State, arg: string): Promise<void> {

    console.log(`Exploring ${arg}...`);

    const locations = await state.pokeAPI.fetchLocation(arg);
    for (let pokemon_encounters of locations.pokemon_encounters) {
        console.log("- ", pokemon_encounters.pokemon.name);
    }
    
}