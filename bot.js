const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const commandList = [
  { command: 'start', description: '查看帮助' },
  { command: 'add', description: '/add <钱包地址> <备注> 添加一个钱包地址到您的监控列表' },
  { command: 'remove', description: '/remove <钱包地址> 从您的监控列表中移除一个钱包地址' },
  { command: 'list', description: '列出所有添加的钱包和备注，并给出总数量' },
  { command: 'sub_era', description: '/sub_era <天数> 订阅钱包在 zkSync Era 最近一次交易记录，超过<天数>将消息提醒' },
  { command: 'sub_lite', description: '/sub_lite <天数> 订阅钱包在 zkSync Lite 最近一次交易记录，超过<天数>将消息提醒' },
  { command: 'unsub_era', description: '取消订阅 Era' },
  { command: 'unsub_lite', description: '取消订阅 Lite' },
  { command: 'ping', description: '检查机器人是否在线' },
]

const setupBot = () => {
  require('../commands/start')(bot);
  require('../commands/add_wallet')(bot);
  require('../commands/remove_wallet')(bot);
  require('../commands/list')(bot);
  require('../commands/sub_era')(bot);
  require('../commands/sub_lite')(bot);
  require('../commands/ping')(bot);
  bot.setMyCommands(commandList);
};

module.exports = {
  bot,
  setupBot,
};
