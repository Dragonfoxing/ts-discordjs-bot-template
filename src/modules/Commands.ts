import { Command } from "../interfaces/Command";
import { Hello } from "../commands/Hello";
import { Ping } from "../commands/Ping";

// TODO: More elegant method of collecting our commands in one place.

export const Commands: Command[] = [Hello, Ping];