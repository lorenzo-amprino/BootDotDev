import { Cache } from "./pokecache.js";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const state = initState(new Cache(10000));

  startREPL(state);
}

main();