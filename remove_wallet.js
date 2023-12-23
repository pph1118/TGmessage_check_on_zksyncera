// src/commands/remove_wallet.js

const { bot } = require('../utils/bot');
const { removeWallet } = require('../utils/database');

module.exports = (bot) => {
  bot.onText(/\/remove (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const wallet = match[1];

    const success = removeWallet(chatId, wallet);
    if (success) {
      bot.sendMessage(chatId, `钱包地址：${wallet} (备注：${success}) 已成功移除。`);
    } else {
      bot.sendMessage(chatId, `未找到钱包地址`);
    }
  });
};