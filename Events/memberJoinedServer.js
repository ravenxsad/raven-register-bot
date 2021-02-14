const { Discord, MessageEmbed } = require('discord.js');
const ayar = require('../raven.json');
const moment = require("moment");
const ayarlar = require('../ayarlar.json');
const qdb = require("quick.db");

module.exports = async (member) => {
  let client = global.client;
  let sunucu = client.guilds.cache.get(ayar.sunucuID);
  let logKanal = sunucu.channels.cache.get(ayar.kayitKanal);
  let ravenDurum = Date.now()-member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7
  
  let ravenGün = moment(member.user.createdAt).format("DD");
  let ravenTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
  let ravenAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık"); 

  if (logKanal) logKanal.send(`<a:yildiz:799418324291026944> Sunucumuza Hoş geldin! ${member}, Sunucumuz seninle birlikte ${client.emojiSayi(`${member.guild.memberCount}`)} kişiye ulaştı!
  
<a:yildiz:799418324291026944> Sunucu odalarını görebilmek için önceklikle sesli teyit odalarından birisine girmeli ve **İsim Yaş** belirtmelisin!
      
<a:yildiz:799418324291026944> Hesabın: **${ravenGün} ${ravenAylar} ${ravenTarih}** Tarihinde oluşturulmuş. Kayıt olmak için bir engel ${ravenDurum ? "Bulunuyor: **Hesap yeni!**" : "**Bulunmuyor!**"}
      
<a:yildiz:799418324291026944> Sunucu kurallarımız <#806930163446710288> kanalında belirtilmiştir. Kayıt olduktan sonra kuralları okuduğunu kabul edeceğiz ve içerde yapılacak **Ceza-i İşlem**'leri bunu göz önünde bulundurarak işlemleri yapacağız!`)
  
       
    if (ravenDurum) {
        member.roles.set([ayar.cezaliRolu])
      }else{
    member.roles.set([ayar.teyitsizRolu])
  }
    };

module.exports.configuration = {
  name: "guildMemberAdd"
}
