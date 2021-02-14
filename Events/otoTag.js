const { Discord, MessageEmbed } = require('discord.js');
const ayar = require('../raven.json');

module.exports = (oldUser, newUser) => {
    
    if (oldUser.bot || newUser.bot) return;
        let client = global.client;
        let sunucu = client.guilds.cache.get(ayar.sunucuID);
        let taglog = sunucu.channels.cache.get(ayar.otoTagLogKanal);
        let member = sunucu.members.cache.get(oldUser.id);
        let raven = new MessageEmbed().setAuthor(member.user.username, member.user.avatarURL({dynamic: true})).setTimestamp().setFooter("Râven ❤️ Syrix").setColor("GREEN")
        let eleven = new MessageEmbed().setAuthor(member.user.username, member.user.avatarURL({dynamic: true})).setTimestamp().setFooter("Râven ❤️ Syrix").setColor("RED")
        if (!oldUser.username.includes(ayar.tag) && newUser.username.includes(ayar.tag)) {

          if (member.manageable) {
                    member.roles.add(ayar.ekipRolu);
                        if (taglog) { taglog.send(raven.setDescription(`${member} adlı üye tagımızı aldığı için kendisine ekip rolü verildi.`)) }else{ member.send(`**${sunucu.name}** adlı sunucumuzda tagımızı aldığın için ekip rolü kazandın.`).catch() }
            }
        };
  
  if (oldUser.username.includes(ayar.tag) && !newUser.username.includes(ayar.tag)) {
             if (member.manageable) {
                 if (!member.roles.cache.has(ayar.teyitciRolu)) {
                     member.roles.remove(ayar.ekipRolu);
                     if (taglog) { taglog.send(eleven.setDescription(`${member} adlı üye tagımızı bıraktığı için kendisinden ekip rolü alındı.`)) }else{ member.send(`**${sunucu.name}** adlı sunucumuzda tagımızı bıraktığın için ekip rolünü kaybettin.`).catch() }
                    }else{
                        if (member.roles.cache.has(ayar.erkekRolu)) {
                            if (taglog) { taglog.send(eleven.setDescription(`${member} adlı yetkili tagımızı bıraktığı için kendisinden ekip rolü ve yetkileri alındı.`)) }else{ member.send(`**${sunucu.name}** sunucumuzda tagımızı saldığın için yetkilerin alındı.`).catch() }
                        member.roles.cache.has(ayar.boosterRolu) ? member.roles.set([ayar.boosterRolu, ayar.erkekRolu]) : member.roles.set([ayar.erkekRolu]);
                        return;
                        }
                        if (member.roles.cache.has(ayar.kadinRolu)) {
                            if (taglog) { taglog.send(eleven.setDescription(`${member} adlı yetkili tagımızı bıraktığı için kendisinden ekip rolü ve yetkileri alındı.`)) }else{ member.send(`**${sunucu.name}** sunucumuzda tagımızı saldığın için yetkilerin alındı.`).catch() }
                            member.roles.cache.has(ayar.boosterRolu) ? member.roles.set([ayar.boosterRolu, ayar.kadinRolu]) : member.roles.set([ayar.kadinRolu]);
                            return;
                        }
                    }
             }
        }

};
  
module.exports.configuration = {
    name: "userUpdate"
  }