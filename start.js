// src/commands/start.js

const { bot } = require('../utils/bot');

module.exports = (bot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = `
欢迎使用加密货币钱包监控程序！
这里是一些您可以使用的命令：

- /ping
  检查机器人是否在线。

- /add <钱包地址> <备注>
  添加一个钱包地址到您的监控列表。

- /remove <钱包地址>
  从您的监控列表中移除一个钱包地址。

- /list
  查看您监控列表中的所有钱包的地址和备注。

- /sub_era <天数>
  订阅所有钱包在 zkSync Era 的交易情况，如果有钱包超出指定天数没有交易，将会发送提醒。（不包含从未在 zkSync Era 交易过的钱包）

- /sub_lite <天数>
  订阅所有钱包在 zkSync Lite 的交易情况，如果有钱包超出指定天数没有交易，将会发送提醒。（不包含从未在 zkSync Lite 交易过的钱包）

- /unsub_era && /unsub_lite
  取消订阅钱包交易情况。

- /start
  查看帮助信息。

请注意，钱包地址和备注之间用空格隔开。
    `;

    bot.sendMessage(chatId, helpMessage);
  });
};
