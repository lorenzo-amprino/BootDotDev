import { sql } from "drizzle-orm";
import { db } from "..";
import { feed_follows, feeds, users } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeedFollow(feed_id: string, user_id: string) {
  const [result] = await db
    .insert(feed_follows)
    .values({ feed_id: feed_id, user_id: user_id })
    .returning();

  const [all] = await db.select()
    .from(feed_follows)
    .innerJoin(users, eq(feed_follows.user_id, users.id))
    .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
    .where(eq(feed_follows.id, result.id));
  return all;
}


export async function getFeedFollowsForUser(user_id: string){
    return await db.select()
    .from(users)
    .innerJoin(feed_follows, eq(feed_follows.user_id, users.id))
    .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
    .where(eq(users.id, user_id));
}
