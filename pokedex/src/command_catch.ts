import { State } from "./state";

export async function commandCatch(state: State, pokemonName: string){
    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

    const chance = Math.random();

    if(chance <= 2 / Math.sqrt(pokemon.base_experience! + 3)){
        console.log(`catch ${pokemonName}`);
        state.pokedex[pokemonName] = pokemon;
    } else {
        console.log(`Pokeball opens and ${pokemonName} escaped`);
    }
}