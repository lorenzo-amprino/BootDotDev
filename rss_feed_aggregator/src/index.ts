import { argv } from "node:process";
import { CommandRegistry, registerCommand, runCommand } from "./commands/commandregistry";
import { readConfig, setUser } from "./config";
import { handlerLogin } from "./commands/login_command";
import { handlerRegister } from "./commands/register_command";

async function main() {

  console.log(readConfig().dbUrl);
  const registry: CommandRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);

  let command = argv.slice(2, 3);
  let args = argv.slice(3);

  if (command.length == 0) {
    throw new Error("Not enough arguments were provided");
  }

  await runCommand(registry, command[0], ...args);

  process.exit(0);
}

main();
