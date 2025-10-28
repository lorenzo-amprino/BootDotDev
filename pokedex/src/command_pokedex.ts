import { State } from "./state";

export async function commandPokedex(state: State){
    console.log("Your Pokedex");
    for(let key in state.pokedex ){
        console.log(`- ${key}`);
    }
}