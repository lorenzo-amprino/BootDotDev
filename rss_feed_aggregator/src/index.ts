import { readConfig, setUser } from "./config";

function main() {
  console.log("Hello, world!");
}

main();
setUser("Lane");
const config = readConfig()

console.log(config);