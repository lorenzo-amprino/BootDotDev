import { CommandHandler } from "./command_handler";

export type CommandRegistry = Record<string, CommandHandler>;

export function registerCommand(
  registry: CommandRegistry,
  cmdName: string,
  handler: CommandHandler
) {
  registry[cmdName] = handler;
}

export async function runCommand(
  registry: CommandRegistry,
  cmdName: string,
  ...args: string[]
) {
  if (registry[cmdName]) {
    registry[cmdName](cmdName, ...args);
  } else {
    console.log(`Command ${cmdName} not found.`);
  }
}
