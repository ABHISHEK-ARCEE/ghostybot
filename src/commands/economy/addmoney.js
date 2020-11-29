const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "addmoney",
  description: "Add money to a user",
  category: "economy",
  memberPermissions: ["MANAGE_MEMBERS"],
  async execute(bot, message, args) {
    const member = bot.findMember(message, args);
    const lang = await bot.getGuildLang(message.guild.id);
    const amount = args[1];

    if (!member) {
      return message.channel.send(lang.MEMBER.PROVIDE_MEMBER);
    }

    if (!amount) {
      return message.channel.send(lang.LEVELS.PROVIDE_AMOUNT);
    }

    const { user } = await getUserById(member.user.id, message.guild.id);
    await updateUserById(member.user.id, message.guild.id, {
      bank: user.bank + Number(amount),
    });

    return message.channel.send(
      lang.ECONOMY.ADDED_MONEY.replace("{amount}", amount)
    );
  },
};
