import { getUser } from "src/lib/db/queries/users";
import { setUser } from "../config";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void>{

    if(args.length == 0) throw new Error("Login command expects a single argument.");

    const user = await getUser(args[0]);

    if(!user){
        throw new Error("Given username doesn't exist.");
    }

    setUser(args[0]);
    console.log(`user ${args[0]} has been set`);
}