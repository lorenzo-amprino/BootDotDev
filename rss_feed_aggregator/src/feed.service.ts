import { isChannel, isValidItem, RSSFeed } from "./rss";
import { XMLParser } from "fast-xml-parser";

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const res = await fetch(feedURL, {
    method: "GET",
    headers: { "User-Agent": "gator" },
  });
  const xml = await res.text();
  const parser = new XMLParser();
  const raw: unknown = parser.parse(xml);
  const rss = (raw as any)?.rss; // or validate rss similarly
  const ch = rss?.channel as unknown;

  if (!isChannel(ch)) {
    throw new Error("missing channel");
  }

  const rawItems: unknown = (ch as any).item;
  const itemsArray = Array.isArray(rawItems)
    ? rawItems
    : rawItems && typeof rawItems === "object"
    ? [rawItems]
    : [];

  const validItems = itemsArray.filter(isValidItem);

  const channel = {
    title: ch.title,
    link: ch.link,
    description: ch.description,
    item: validItems,
  };
  return { channel };
}
