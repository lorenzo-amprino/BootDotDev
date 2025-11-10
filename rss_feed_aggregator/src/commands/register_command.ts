import { conn } from "../lib/db";
import { createUser } from "../lib/db/queries/users";
import { handlerLogin } from "./login_command";

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0)
    throw new Error("Register command expects a single argument.");
  try {
    const user = await createUser(args[0]);
    await handlerLogin("login", user.name);
    console.log(`user ${user.name} has been created`);
  } catch (err) {
    if (err instanceof Error) {
      console.log("erroraccio" , err.message);
      throw err;
    }
  } finally {
    await conn.end({ timeout: 5 });
    console.log("conn closed");
  }
}
