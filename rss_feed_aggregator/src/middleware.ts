import { UserCommandHandler, CommandHandler } from "./commands/command_handler";

 type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;
