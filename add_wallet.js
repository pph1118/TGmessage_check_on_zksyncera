// src/commands/add_wallet.js

const { bot } = require('../utils/bot');
const { addWallet } = require('../utils/database');

module.exports = (bot) => {
  bot.onText(/\/add (.+) (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const walletAddress = match[1];
    const walletNote = match[2];

    const wallet = {
      address: walletAddress,
      note: walletNote,
    };

    addWallet(chatId, wallet);
    bot.sendMessage(chatId, `钱包地址：\`${walletAddress}\`，备注：${walletNote.replaceAll('-', '\\-')} 已成功添加。`, { parse_mode: 'MarkdownV2' });
  });
};
