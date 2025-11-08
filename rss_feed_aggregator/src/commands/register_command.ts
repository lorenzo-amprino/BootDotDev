import { createUser } from "src/lib/db/queries/users";

export async function handlerRegister(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  if (args.length == 0)
    throw new Error("Register command expects a single argument.");

  try {
    const user = await createUser(args[0]);
    console.log(`user ${user.name} has been created`);
  } catch (err) {
    console.log("errore ", err);
  }
}
