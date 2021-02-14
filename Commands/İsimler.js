const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
const ayar = require("../raven.json");
const ayarlar = require("../ayarlar.json");
module.exports.execute = async (client, message, args) => {
  
    let syrix = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setFooter(`Râven ❤️ Syrix`);
    if (!message.member.roles.cache.has(ayar.teyitciRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(syrix.setDescription(`Bu komutu kullanmak için gerekli izinlere sahip değilsin.`)).then(x => x.delete({timeout: 10000}));
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(syrix.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    var sayi = 1
    let data = db.get(`isim.${message.guild.id}`)
    let rol = db.fetch(`rol.${message.guild.id}`)
    if(!data) return message.channel.send(syrix.setDescription('Kullanıcının kayıtı bulunmamaktadır.')).then(x => x.delete({timeout: 10000}));
   let isimler = data.filter(x => x.userID === member.id).map(x => `${sayi++}- \`${ayar.tag} ${x.Name} | ${x.Age}\` (<@&${x.Role}>)`).join("\n")
    if(isimler === null) isimler = "Kullanıcının kayıtı bulunmamaktadır."
    if(isimler === undefined) isimler = "Kullanıcının kayıtı bulunmamaktadır."

   const raven = new MessageEmbed()
   .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
   .setColor("RANDOM")
   .setFooter(`Râven ❤️ Syrix`)
   .setDescription(`Bu kullanıcının toplamda **${sayi-1}** isim kaydı bulundu\n\n${isimler}`)
   message.channel.send(raven)

}

module.exports.configuration = {
    name: "isimler",
    aliases: ["isimler"],
    usage: "isimler / isimler @üye",
    description: "Belirtilen üyenin geçmiş isimlerine bakarsınız."
};

