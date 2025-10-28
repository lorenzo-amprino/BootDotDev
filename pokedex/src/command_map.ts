import { ShallowLocations } from "./pokeAPI";
import { State } from "./state";

export async function commandMap(state: State): Promise<void> {
    const nextUrl = state.locationAreaNextUrl;

    const locations = await state.pokeAPI.fetchLocations(nextUrl);
    for (let location of locations.results) {
        console.log(location.name);
    }
    state.locationAreaNextUrl = locations.next;
    state.locationAreaPrevUrl = locations.previous;
    
}

export async function commandMapb(state: State): Promise<void> {
    const previousUrl = state.locationAreaPrevUrl;
    if (!previousUrl) {
        console.log("you're on the first page");
    } else {
        const locations = await state.pokeAPI.fetchLocations(previousUrl);
        for (let location of locations.results) {
            console.log(location.name);
        }
        state.locationAreaNextUrl = locations.next;
        state.locationAreaPrevUrl = locations.previous;
    }
}