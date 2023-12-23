// src/commands/ping.js

const { bot } = require('../utils/bot');

module.exports = (bot) => {
  bot.onText(/\/ping/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'pong!');
  });
};
