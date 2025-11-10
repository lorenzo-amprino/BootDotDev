import { deleteUsers } from "src/lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]){
    await deleteUsers();
}