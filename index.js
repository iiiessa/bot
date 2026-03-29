const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (!message.guild) return;

  if (message.content.startsWith('!bc')) {

    if (!message.member.permissions.has('Administrator')) {
      return message.reply('❌ ما عندك صلاحية');
    }

    const msg = message.content.slice(4);
    if (!msg) return message.reply('❌ اكتب رسالة');

    const members = await message.guild.members.fetch();

    members.forEach(member => {
      if (!member.user.bot) {
        member.send(msg).catch(() => {});
      }
    });

    message.reply('✅ تم الإرسال');
  }
});

client.login('MTQ4NzY3MDk4NTg5MjE3MTg1Ng.GYnqVa.j8RLveNbyKlWsI0AuK_0fdMK3695qlB1c0K-yE');