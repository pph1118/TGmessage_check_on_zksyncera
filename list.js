// src/commands/list.js

const { bot } = require('../utils/bot');
const { getUserWallets } = require('../utils/database');

module.exports = (bot) => {
  bot.onText(/\/list/, (msg) => {
    const chatId = msg.chat.id;
    const wallets = getUserWallets(chatId);

    if (wallets.length === 0) {
      bot.sendMessage(chatId, '您尚未添加任何钱包。');
    } else {
      const walletList = wallets
        .map((wallet, index) => {
          const escapedNote = wallet.note.replace(/\./g, '\\.'); // Escape dot
          return `${index + 1}\\. 地址：\`${wallet.address}\`，备注：${escapedNote}`;
        })
        .join('\n');

      const message = `您添加的钱包如下：\n${walletList}\n\n总数量：${wallets.length}`;
      bot.sendMessage(chatId, message, { parse_mode: 'MarkdownV2' });
    }
  });
};
