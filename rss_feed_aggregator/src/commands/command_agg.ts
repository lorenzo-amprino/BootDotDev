import { fetchFeed } from "src/feed.service";

export async function aggHandler(cmdName: string, ...args: string[]){
    const feed = await fetchFeed("https://www.wagslane.dev/index.xml");
    
    console.log(JSON.stringify(feed));
    return;
}