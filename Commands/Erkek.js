const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const ayarlar = require("../ayarlar.json");
const ayar = require("../raven.json");

module.exports.execute = async (client, message, args) => {

    let syrix = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter(`Râven ❤️ Syrix`);
    let sunucu = client.guilds.cache.get(ayar.sunucuID);
    let logKanal = sunucu.channels.cache.get(ayar.chatKanali);
    if (!message.member.roles.cache.has(ayar.teyitciRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(syrix.setDescription(`Bu komutu kullanmak için gerekli izinlere sahip değilsin.`)).then(x => x.delete({timeout: 10000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(syrix.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(syrix.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
    args = args.filter(a => a !== "" && a !== " ").splice(1);
  
    let ravenSyrix;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(!isim || !yaş) return message.channel.send(syrix.setDescription("Geçerli bir isim ve yaş belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    ravenSyrix = `${ayar.tag} ${isim} | ${yaş}`;
    uye.setNickname(`${ravenSyrix}`).catch();
              let erkekRol = message.guild.roles.cache.get(ayar.erkekRolu);
              if (erkekRol) {
              uye.roles.cache.has(ayar.boosterRolu) ? uye.roles.set([ayar.boosterRolu, ayar.erkekRolu]) : uye.roles.set([ayar.erkekRolu]);
            }
  
  if (logKanal) logKanal.send(`Aramıza yeni birisi katıldı! ${uye}, Ona bi hoşgeldin diyelim! <a:selaam:799593780524220426>`)

  if (uye.user.username.includes(ayar.tag) && !uye.roles.cache.has(ayar.ekipRolu)) {
                uye.roles.add(ayar.ekipRolu);
            }
        rdb.add(`reg.${message.author.id}.erkek`, +1);
        qdb.push(`isim.${message.guild.id}`, {
                guildName: `${ravenSyrix}`,
                userID: uye.id,          
                Name: isim,
                Age: yaş,
                Role: ayar.erkekRolu
            });

  
  
    return message.react(client.emojiler.onay);
},
  
  module.exports.configuration = {
    name: "erkek",
    aliases: ["e"],
    usage: "erkek @üye [isim] [yaş]",
    description: "Belirtilen üyeyi sunucuya erkek olarak kaydını gerçekleştirmiş olursunuz."
};