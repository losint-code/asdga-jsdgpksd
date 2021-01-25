const { MessageEmbed, Client, Message } = require("discord.js");
const db = require("quick.db");
const Settings = require("../Settings/Settings.json");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
  let yetkili = Settings.Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(yetkili)) return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!user) return message.channel.send("Bir üyeyi etiketlemelisin.")
  let check = await db.has(`${message.author.id}.toplam`)
  if (check === false) return message.channel.send("Bu üyenin herhangi bir kayıt verisine ulaşamadım.")

  let kadınsayı = await db.get(`${message.author.id}.kadın`)
  let erkeksayı = await db.get(`${message.author.id}.erkek`)
  let toplam = await db.get(`${message.author.id}.toplam`)

  const embed = new MessageEmbed()
   .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
  .setDescription(`[+] ${user.user.username} Yetkilisinin Kaydettiği Kişiler [+] \n\n• Toplam Kaydettiği Kişi: ${toplam} \n• Toplam Kaydettiği Kadın: ${kadınsayı || "0"} \n• Toplam Kaydettiği Erkek: ${erkeksayı || "0"}`)
  .setTimestamp()
  .setColor(Settings.Colors.Gold)
  .setFooter(`Losint ♥ Development`)
  message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["stat", "stats"]
};

module.exports.help = {
  name: 'stat'
};