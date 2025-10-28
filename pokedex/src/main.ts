import { PokeCache } from "./pokeCache.js";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const state = initState(new PokeCache(10000));

  startREPL(state);
}

main();