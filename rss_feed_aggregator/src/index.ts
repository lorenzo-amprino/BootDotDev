import { argv } from "node:process";
import {
  CommandRegistry,
  registerCommand,
  runCommand,
} from "./commands/commandregistry";
import {
  handlerLogin,
  handlerRegister,
  handlerReset,
  usersHandler,
  aggHandler,
  addFeedHandler,
  handlerFeeds,
  handlerFollow,
  handlerFollowing,
  middlewareLoggedIn,
} from "./commands/commands";

async function main() {
  const registry: CommandRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", usersHandler);
  registerCommand(registry, "agg", aggHandler);
  registerCommand(registry, "addfeed", middlewareLoggedIn(addFeedHandler));
  registerCommand(registry, "feeds", handlerFeeds);
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));

  let command = argv.slice(2, 3);
  let args = argv.slice(3);

  if (command.length == 0) {
    throw new Error("Not enough arguments were provided");
  }

  await runCommand(registry, command[0], ...args);
}

main();

