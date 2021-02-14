const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const ayarlar = require('../ayarlar.json');
const ayar = require("../raven.json");

module.exports.execute = async (client, message, args) => {
    let syrix = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter(`Râven ❤️ Syrix`);
    if (!message.member.roles.cache.has(ayar.teyitciRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(syrix.setDescription(`Bu komutu kullanmak için gerekli izinlere sahip değilsin.`)).then(x => x.delete({timeout: 10000}));
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send(syrix.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(syrix.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let ravenSyrix;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(!isim || !yaş) return message.channel.send(syrix.setDescription("Geçerli bir isim ve yaş belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    ravenSyrix = `${ayar.tag} ${isim} | ${yaş}`;
    member.setNickname(`${syrix}`).catch();
    return message.react(client.emojiler.onay);
   
};

module.exports.configuration = {
    name: "isim",
    aliases: ["nick", "i"],
    usage: "isim @üye [isim] [yaş]",
    description: "Belirtilen üyenin sunucudaki ismini değiştirir."
};