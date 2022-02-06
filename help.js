module.exports = {
	name: 'help',
	description: 'A custom help command',
	async execute(message, args) {

const { Client, MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');
        // Creating the menu like this will automatically send it and handle reactions - basically everything.
        // I recommend you import this big array from a secondary file to clean up your code - your choice though.
        new Menu(message.channel, message.author.id, [
            {
                name: "main",
                content: new MessageEmbed({
                    title: "Help",
                    description: "Fun Commands:",
                    fields: [
											{
											name: "badbot",
											value: ":("
											},
											{
											name: "bellyrub",
											value: "I'll get around to this eventually lol."
											},
											{
											name: "ccv",
											value: "tells you how much money you have with a certain number of coins!\nUsage:%ccv pennies nickels dimes quarters halfdollars dollars"
											},
											{
											name: "choose",
											value: "Give a list of choices seperated by spaces, and I'll pick one for you!"
											},
											{
											name: "confess",
											value: "Send an anonymous confession! Usage: %confess [serverid] [your confession]\nMight need to be enabled by server owner!"
											},
											{
											name: "doge",
											value: "get one of 17 doge pics, randomly."
											},
											{
											name: "emoji",
											value: "have me post an emoji from any server I'm in by name! Ie: %emoji transparentfastpat"
											},
											{
											name: "evenorodd",
											value: "I'll tell you whether a provided number is even or odd!"
											},
											{
											name: "feelsbadman",
											value: "I'll try to cheer you up!"
											},
											{
											name: "gibcat",
											value: "get a random cat pic!"
											},
											{
											name: "goodbot",
											value: ":)"
											},
											{
											name: "headpat",
											value: "pat someones head :)"
											},
											{
											name: "hug",
											value: "give someone a hug! they might need it ;)"
											},
											{
											name: "joke",
											value: "get a random joke!"
											},
											{
											name: "ping",
											value: "pong ;)"
											},
											{
											name: "reverse",
											value: "tupni ruoy sesrever"
											},
											{
											name: "roll",
											value: "roll a die! make sure to include the number of sides!\nexample: %roll 6"
											},
											{
											name: "rps",
											value: "rock paper scissors with me! usage:%rps rock"
											},
											{
											name: "say",
											value: "i'll read off the script you give me lol!"
											},
											{
											name: "uwuify",
											value: "u-uwuifies youw text"
											},
											{
											name: "vui",
											value: "Get a pic of a given users info! Ie: %vui @Goodbot"
											}
                    ]
                }),
                reactions: {
                    "⏹": "stop",
                    "▶": "next",
                    "⚙": "otherPage",
                    "732075420786229270":"last"
                }
            },
						{
                name: "Page 2",
                content: new MessageEmbed({
                    title: "Page 2",
                    description: "Economy Commands:",
                    fields: [
											{
											name: "bal",
											value: "check your balance!"
											},
											{
											name: "pay",
											value: "give money to another user! usage: pay @Goodbot 10"
											},
											{
											name: "work",
											value: "do a lil work to get a lil money!"
											},
											{
											name: "vui",
											value: "already listed in the fun section, but this does show other users balances."
										},
										{
											name: "status",
											value: "pay some creds to change my status! as of 3/21/2020 this costs 10 credits!"
										}
                    ]
                }),
                reactions: {
                    "⏹": "stop",
										"◀": "previous",
                    "▶": "next",
                    "⚙": "otherPage",
                    "732075420786229270":"last"
                }
            },
						{
                name: "Page 3",
                content: new MessageEmbed({
                    title: "Page 3",
                    description: "NSFW Commands:",
                    fields: [
											{
											name: "nhentai",
											value: "get a link to any nhentai doujin using it's code"
											},
											{
											name: "booru",
											value: "get a random image from one of several booru style imageboards! do %booru list for a list of site codes!"
											}
										]
								}),
								reactions: {
										"⏹": "stop",
										"◀": "previous",
										"▶": "next",
										"⚙": "otherPage",
										"732075420786229270":"last"
								}
						},

            {
                name: "otherPage",
                content: new MessageEmbed({
                    title: "Thanks!",
                    description: "Thank you for using GoodBot!",
                    fields: [
                        {
                            name: "Have any suggestions or comments?",
                            value: "Join my server! https://discord.gg/qkckjWJ"
                            // (Each page can only have 20 reactions, though. Discord's fault.)
                        }
                    ]
                }),
                reactions: {
                    "⏹": "stop",
                    "◀": "previous",
                    "1️⃣": "first"

                }
            }
        ]);
    }
};
