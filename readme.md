# Installations
```
npm i discord.tictactoe
```

# What?
This package is created for making Tic Tac Toe game for discord bots with rich features like Message Components.

# Why?
This package is very easy to use and you can request new updates and stuff simple by messaging me on my [discord server](https://discord.gg/XYnMTQNTFh)

# How?
```js
const ttt = require('discord.tictactoe');

/**
 * This method will start a Solo game between The message author and bot, everyhting is automatic <3
 * @param {Discord.Message} message The message object where command was used
 * @param {Discord.Client} bot Your client object
 */
ttt.solo(message,bot);

/**
 * This method will start a Duo game between The message author and Player 2, everyhting is automatic <3
 * @param {Discord.Message} message The message object where command was used
 * @param {Discord.User} player2 The mentioned User / second player. Note it should be a discord user Object not guild member object
 */
ttt.duo(message,player2);
```

# Example Images
## The Game
![game.png](https://cdn.discordapp.com/attachments/880732844220100608/880732951573331988/unknown.png)

## Game ending
![gameend.png](https://cdn.discordapp.com/attachments/880732844220100608/880732852541612062/unknown.png)

## Game request for DUO Mode
![gamerequest.png](https://cdn.discordapp.com/attachments/880732844220100608/880733096352288808/unknown.png)

# Support
If you need any help or something you can get support on my [discord server](https://discord.gg/XYnMTQNTFh)