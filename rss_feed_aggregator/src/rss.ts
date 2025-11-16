
export type RSSFeed = {
  channel: Channel
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export type Channel = {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
}

export function isChannel(x: unknown): x is Channel{
    if(typeof x !== "object" || x === null) return false;
    const ch = x as Record<string, unknown>;
    return (
        isNonEmptyString(ch.title) &&
        isNonEmptyString(ch.description) &&
        isNonEmptyString(ch.link)
    )
}

function isNonEmptyString(x: unknown): x is string {
  return typeof x === "string" && x.trim().length > 0;
}

export function isValidItem(x: unknown): x is RSSItem{
    if(typeof x !== "object" || x === null) return false;
    const it = x as Record<string, unknown>;
    return (
        isNonEmptyString(it.title) &&
        isNonEmptyString(it.description) &&
        isNonEmptyString(it.link) &&
        isNonEmptyString(it.pubDate)
    )
}