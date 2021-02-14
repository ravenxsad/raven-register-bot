const Discord = require('discord.js');
module.exports = (message) => {

    if (message.content.toLowerCase() === "tag") {
        message.channel.send(`ֆ`)
    };

  if (message.content.toLowerCase() === "!tag") {
        message.channel.send(`ֆ`)
    };
  
  if (message.content.toLowerCase() === ".tag") {
        message.channel.send(`ֆ`)
    };
};

module.exports.configuration = {
    name: "message"
  }