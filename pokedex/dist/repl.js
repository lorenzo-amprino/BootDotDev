export function cleanInput(input) {
    if (input.length == 0) {
        return [];
    }
    const arr = input.trim().replaceAll(/\s+/g, " ").split(" ");
    return arr.map((x) => x.toLowerCase());
}
export function startREPL(state) {
    const rl = state.readLineInterface;
    rl.prompt();
    rl.on("line", async (input) => {
        const inputArr = cleanInput(input);
        if (inputArr.length == 0) {
            rl.prompt();
        }
        else {
            const commands = state.commandsRegistry;
            const command = commands[inputArr[0]];
            if (command != undefined) {
                try {
                    await command.callback(state);
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.error("error:", err.message);
                    }
                    else if (typeof err === "string") {
                        console.error("error:", err);
                    }
                    else {
                        console.error("error: unknown");
                    }
                }
            }
            else {
                console.log("Unknown command");
            }
            rl.prompt();
        }
    });
}
