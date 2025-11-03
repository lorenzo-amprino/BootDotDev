import fs from "fs";
import os from "os";
import path from "path";

type Config = {
    dbUrl: string,
    currentUserName: string
}

export function setUser(username: string) {
    let config = readConfig();

    config.currentUserName = username;
    writeConfig(config);
}

export function readConfig(): Config {
    const filePath = getConfigFilePath();
    const content = fs.readFileSync(filePath, { encoding: "utf-8" });

    return validateConfig(JSON.parse(content));
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(config: Config) {
    const filePath = getConfigFilePath();

    fs.writeFileSync(filePath, validateConfigJson(config), { encoding: "utf-8" });
}

function validateConfig(rawConfig: any): Config {
    return { dbUrl: rawConfig.db_url, currentUserName: rawConfig.current_user_name };
}

function validateConfigJson(config: Config): string {
    return JSON.stringify({ db_url: config.dbUrl, current_user_name: config.currentUserName });
}