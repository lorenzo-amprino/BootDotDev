import { db } from "../index";
import { users } from "../schema";

export async function createUser(name: string) {
  console.log("createUser start", name);
  const [result] = await db.insert(users).values({ name }).returning();
  console.log("createUser done", result);
  return result;
}