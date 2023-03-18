# ts-discordjs-bot-template

## Details

This is a template project for a Discord Bot running in NodeJS with Typescript.

It is designed to handle both slash commands and chat commands.

It has two commands to demonstrate usage of both slash and chat commands.

## Requirements

To use this template project, you should know the following:
- How to set up a Discord application and bot user
- How to create bot user invite links
- How to code, build, and run Typescript projects
- How to use javascript in general

This project requires that you add a `.env` file with the following information:
- `TOKEN=[your token here]`
- `PREFIX=[your prefix here]`

The token is your bot token as gained from setting up your discord application and bot user.

The prefix will be your chat command prefix.  Be creative.  Do not use "!", "?", or other single-digit prefixes - many popular bots already use these.

### Scripts

`npm run build` just runs `tsc`.  This will do your type checking and validation.
`npm run start` starts the server.  There's no nodemon involved, so if it crashes it won't restart.

## Notes

I provide this as-is under a CC0 license.  What you see is what you get.  DiscordJS and the Discord API may change and break features in the future.

A lot of comments are provided in order to help you understand what I was doing when I wrote this.  Hopefully it's enough!

And don't forget to go have some fun. :>