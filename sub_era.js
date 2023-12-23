// src/commands/sub.js

const { bot } = require('../utils/bot');
const { getUserWallets } = require('../utils/database');
const { getEraLatestTransactionDate } = require('../utils/getEraTxDate');
const { differenceInDays } = require('date-fns');
const { escapeMarkdownV2 } = require('../utils/markdown');

const checkTransactions = async (chatId, days) => {
  const wallets = getUserWallets(chatId);

  for (const wallet of wallets) {
    const latestTransactionDate = await getEraLatestTransactionDate(wallet.address);
    const now = new Date();

    if (latestTransactionDate && differenceInDays(now, new Date(latestTransactionDate)) >= days) {
      bot.sendMessage(
        chatId,
        escapeMarkdownV2(`[Era] 钱包地址：\`${wallet.address}\`（备注：${wallet.note}）已超过 ${days} 天没有交易。建议您提交一笔交易。上次交易时间：${latestTransactionDate}`),
        { parse_mode: 'MarkdownV2' }
      );
    }
  }
};

let subscriptionInterval;

module.exports = (bot) => {
  bot.onText(/\/sub_era (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const days = parseInt(match[1]);

    if (subscriptionInterval) {
      clearInterval(subscriptionInterval);
    }

    subscriptionInterval = setInterval(async () => {
      await checkTransactions(chatId, days);
    }, 24 * 60 * 60 * 1000); // 每 24 小时执行一次
    // }, 60 * 1000); // 每 1 分钟执行一次

    bot.sendMessage(chatId, `Era 已订阅！如有钱包超过 ${days} 天未进行交易，我们将通知您。`);

    await checkTransactions(chatId, days); // 立即执行一次
  });

  bot.onText(/\/unsub_era/, (msg) => {
    const chatId = msg.chat.id;

    if (subscriptionInterval) {
      clearInterval(subscriptionInterval);
      subscriptionInterval = null;
      bot.sendMessage(chatId, '已取消订阅。');
    } else {
      bot.sendMessage(chatId, '您尚未订阅 Era。');
    }
  });
};
