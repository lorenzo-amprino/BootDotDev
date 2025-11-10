import { sql } from "drizzle-orm";
import { readConfig } from "../../../config";
import { conn, db } from "../../db";
console.log("conn imported", typeof conn);
import { users } from "../../db/schema";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name }).returning();
  return result;
}

export async function getUser(name: string){
  const [user] = await db.select().from(users).where(sql`${users.name} = ${name}`);
  return user;
}

export async function deleteUsers() {
  await db.delete(users);
}

export async function getUsers() {
  return await db.select().from(users);
}