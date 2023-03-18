import { Client, GatewayIntentBits, Partials } from "discord.js";

// Get data from our .env or, on Fly.io/etc, our Secrets.
import * as dotenv from "dotenv";
dotenv.config();

// The event listeners we need for this bot to function.
// This can be made more elegant later.

import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import messageCreate from "./listeners/messageCreate";

// Bot token.

const token = process.env.TOKEN;

// GatewayIntentBits allows us to build our intents array
// using intentsBits while keeping it human readable.
// When passed into the options, the bits get added for us.

const newIntents = [
    // This allows us to check basic guild info.
    // It doesn't give us any more permissions than roles would permit.
    GatewayIntentBits.Guilds,
    // This enables checking guild messages for content/etc.
    // This doesn't stop us from sending messages _in_ guilds.
	GatewayIntentBits.GuildMessages,
    // Have some fun with typing indicators.
    // Not required for DeferReply()
	GatewayIntentBits.GuildMessageTyping,
    // This enables direct messaging capabilities.
	GatewayIntentBits.DirectMessages, 
    // Have some fun with typing indicators.
    // Not required for DeferReply()
	GatewayIntentBits.DirectMessageTyping,
    // This is a privileged intent that we only need
    // for guild chats, basically.
    // Pings and DMs will always yield message content.
	GatewayIntentBits.MessageContent
];

// These data types don't always yield full structures.
// Since they can have data omitted, we must flag the system down
// and say "we recognize the downside of accepting partial data".

const botPartials = [
	Partials.Message,
	Partials.Channel,
	Partials.User
];

// Make our client with our choice of ClientOptions.

const client = new Client({
    intents: newIntents,
    partials: botPartials
});

// Call our event functions to do their listening thing.
// TODO: Refine this by just looping through an array or something nicer.

ready(client);
interactionCreate(client);
messageCreate(client);

// LOG ON :O

client.login(token);