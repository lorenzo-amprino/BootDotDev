import { setUser } from "../config";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void>{

    if(args.length == 0) throw new Error("Login command expects a single argument.");

    setUser(args[0]);
    console.log(`user ${args[0]} has been set`);
}