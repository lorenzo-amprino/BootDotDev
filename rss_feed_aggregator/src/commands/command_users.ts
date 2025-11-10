import { readConfig } from "src/config";
import { getUsers } from "src/lib/db/queries/users";

export async function usersHandler(cmdName: string, ...args: string[]){
    const users = await getUsers();

    const config = readConfig();

    for(let user of users){
        console.log(`* ${user.name} ${config.currentUserName === user.name ? "(current)" : ""}`)
    }
}