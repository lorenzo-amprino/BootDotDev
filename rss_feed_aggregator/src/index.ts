import { argv } from "node:process";
import {
  CommandRegistry,
  registerCommand,
  runCommand,
} from "./commands/commandregistry";
import { handlerLogin } from "./commands/login_command";
import { handlerRegister } from "./commands/register_command";
import { handlerReset } from "./commands/command_reset";
import { usersHandler } from "./commands/command_users";
import { aggHandler } from "./commands/command_agg";

async function main() {
  const registry: CommandRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", usersHandler);
  registerCommand(registry, "agg", aggHandler);


  let command = argv.slice(2, 3);
  let args = argv.slice(3);

  if (command.length == 0) {
    throw new Error("Not enough arguments were provided");
  }

  await runCommand(registry, command[0], ...args);
}

main();
function handlerList(cmdName: string, ...args: string[]): Promise<void> {
  throw new Error("Function not implemented.");
}

