import { State } from "./state";

export async function commandInspect(state: State, pokemonName: string) {
  const pokemon = state.pokedex[pokemonName];

  if (pokemon) {
    console.log(pokemon);
  } else {
    console.log(`${pokemonName} not caught yet`);
  }
}
