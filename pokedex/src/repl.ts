import { createInterface } from "readline";
import { getCommands } from "./command.js";
import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  if (input.length == 0) {
    return [];
  }

  const arr = input.trim().replaceAll(/\s+/g, " ").split(" ");
  return arr.map((x) => x.toLowerCase());
}

export function startREPL(state: State) {
  const rl = state.readLineInterface;

  rl.prompt();
  rl.on("line", async (input) => {
    const inputArr = cleanInput(input);
    if (inputArr.length == 0) {
      rl.prompt();
    }

    else {
      const commands = state.commandsRegistry;
      const command = commands[inputArr[0]];
      const args = inputArr.slice(1);

      if (command != undefined) {
        try {
          await command.callback(state, ...args);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error("error:", err.message);
          } else if (typeof err === "string") {
            console.error("error:", err);
          } else {
            console.error("error: unknown");
          }
        }

      } else {
        console.log("Unknown command");
      }
      rl.prompt();
    }
  })
}