import { readConfig, setUser } from "src/config";
import { fetchFeed } from "src/feed.service";
import { conn } from "src/lib/db";
import {
  deleteFeeds,
  createFeed,
  Feed,
  getFeeds,
  getFeed_by_url,
} from "src/lib/db/queries/feeds";
import {
  createFeedFollow,
  getFeedFollowsForUser,
} from "src/lib/db/queries/feeds_follow";
import {
  getUsers,
  getUser,
  deleteUsers,
  User,
  createUser,
  getUserById,
} from "src/lib/db/queries/users";
import { CommandHandler, UserCommandHandler } from "./command_handler";

export async function usersHandler(cmdName: string, ...args: string[]) {
  const users = await getUsers();

  const config = readConfig();

  for (let user of users) {
    console.log(
      `* ${user.name} ${
        config.currentUserName === user.name ? "(current)" : ""
      }`
    );
  }
}

export async function handlerLogin(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  if (args.length == 0)
    throw new Error("Login command expects a single argument.");

  const user = await getUser(args[0]);

  if (!user) {
    throw new Error("Given username doesn't exist.");
  }

  setUser(args[0]);
  console.log(`user ${args[0]} has been set`);
}

export async function handlerReset(cmdName: string, ...args: string[]) {
  await deleteUsers();
  await deleteFeeds();
}

export async function aggHandler(cmdName: string, ...args: string[]) {
  const feed = await fetchFeed("https://www.wagslane.dev/index.xml");

  console.log(JSON.stringify(feed));
  return;
}

export async function addFeedHandler(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 2)
    throw new Error("AddFeed command expects 2 arguments.");

  const feed = await createFeed(args[0], args[1], user.id);

  const feedFollow = await createFeedFollow(feed.id, user.id);

  console.log(
    `Feed ${feedFollow.feeds.name} created for current user ${user.name}`
  );
  return;
}

function printFeed(user: User, feed: Feed) {
  console.log(user, feed);
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0)
    throw new Error("Register command expects a single argument.");
  try {
    const user = await createUser(args[0]);
    await handlerLogin("login", user.name);
    console.log(`user ${user.name} has been created`);
  } catch (err) {
    if (err instanceof Error) {
      console.log("erroraccio", err.message);
      throw err;
    }
  } finally {
    await conn.end({ timeout: 5 });
    console.log("conn closed");
  }
}

export async function handlerFeeds(cmdName: string, ...args: string[]) {
  const feeds = await getFeeds();
  feeds.forEach(async (f) => {
    const user_feed = await retrieveUsers(f);
    console.log(user_feed);
  });
}

export async function handlerFollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  const feed = await getFeed_by_url(args[0]);
  const feedFollow = await createFeedFollow(feed.id, user.id);

  console.log(JSON.stringify(feedFollow));
}

export async function handlerFollowing(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  const feedFollow = await getFeedFollowsForUser(user.id);

  console.log(JSON.stringify(feedFollow));
}

async function retrieveUsers(feed: Feed): Promise<{ user: User; feed: Feed }> {
  const user = await getUserById(feed.user_id);
  return { user: user, feed: feed };
}

export function middlewareLoggedIn(
  handler: UserCommandHandler
): CommandHandler {
  return async (cmdName: string, ...args: any) => {
    const config = readConfig();

    if (!config.currentUserName) {
      throw new Error("User not logged in");
    }

    const userName = config.currentUserName;

    const user = await getUser(userName);

    if (!user) {
      throw new Error(`User ${userName} not found`);
    }

    await handler(cmdName, user, ...args);
  };
}
