import { db } from "..";
import { feeds } from "../schema";
import { eq, InferSelectModel, sql} from "drizzle-orm";

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

export async function markFeedFetched(id: string){
  await db.update(feeds).set({last_fetched_at: new Date(), updatedAt: new Date()}).where(eq(feeds.id, id));
}

export async function getNextFeedToFetch():Promise<Feed | undefined> {
  const res = await db.execute(sql<Feed>`select * from ${feeds} order by ${feeds.last_fetched_at} asc null first limit 1;`);

  const rows = res as unknown as Feed[];
  return rows[0];
}

export type Feed = typeof feeds.$inferSelect;