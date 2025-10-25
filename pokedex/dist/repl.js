import { createInterface } from "readline";
export function cleanInput(input) {
    if (input.length == 0)
        return [];
    const arr = input.trim().replaceAll(/\s+/g, " ").split(" ");
    return arr.map((x) => x.toLowerCase());
}
export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex ",
    });
    rl.prompt();
    rl.on("line", (input) => {
        const inputArr = cleanInput(input);
        if (inputArr.length == 0) {
            rl.prompt();
        }
        else {
            console.log(`Your command was: ${inputArr[0]}`);
            rl.prompt();
        }
    });
}
