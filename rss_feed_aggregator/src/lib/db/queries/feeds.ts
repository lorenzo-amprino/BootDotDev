import { db } from "..";
import { feeds } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeed(name: string, url: string, user_id: string) {
  const [result] = await db.insert(feeds).values({ name: name, url: url, user_id: user_id }).returning();
  return result;
}

export async function getFeeds() {
  return await db.select().from(feeds);
}

export async function getFeed_by_url(url: string) {
  const [res] =  await db.select().from(feeds).where(eq(feeds.url, url));
  return res;
}

export async function deleteFeeds() {
  await db.delete(feeds);
}

export type Feed = typeof feeds.$inferSelect;