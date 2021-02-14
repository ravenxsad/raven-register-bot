const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const ayar = require("../raven.json");

module.exports.execute = (client, message, args, emoji) => {
  let tag2 = ayar.tag || undefined;
  let boosterRolu = ayar.boosterRolu || undefined;
  const embed = new MessageEmbed().setTimestamp().setColor('RANDOM').setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setFooter("Râven ❤️ Syrix");
  message.channel.send(embed.setDescription(`Sunucumuzda **toplam** ${client.emojiSayi(`${message.guild.memberCount}`)} üye bulunmaktadır.
Şuan **online** ${client.emojiSayi(`${message.guild.members.cache.filter(u => u.presence.status != "offline").size}`)} üye bulunmaktadır.
**Tagımızda** ${client.emojiSayi(`${message.guild.members.cache.filter(m => m.user.username.includes(tag2)).size}`) || "Ayarlanmamış"} üye bulunmaktadır.
**Ses kanallarında** ${client.emojiSayi(`${message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)}`)} üye bulunmaktadır.
Sunucumuzda toplam ${client.emojiSayi(`${message.guild.roles.cache.get(boosterRolu).members.size}`) || "Ayarlanmamış"} **booster** üye bulunmaktadır.`));
};

module.exports.configuration = {
    name: "say",
    aliases: ["count","yoklama"],
    usage: "say",
    description: "Sunucu sayımı."
};