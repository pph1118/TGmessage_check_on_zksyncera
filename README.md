# Telegram Wallet Monitor - zkSync

监控钱包在 zks 上的活动。

# 安装

```bash
npm i
```

# 配置

```bash
cp .env.example .env
```

填写 Telegram Bot token，指定PORT。

## MacOS Arm (M1+)

参考 https://zhuanlan.zhihu.com/p/365399957

```bash
brew install --cask eloston-chromium
```

并指定 `src/utils/getEraTxDate.js` 和 `src/utils/getLiteTxDate.js` 中 `executablePath` 为 `/Applications/Chromium.app/Contents/MacOS/Chromium`.

## Linux 服务器 （Ubuntu为例）

```bash
sudo apt install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 libgbm-dev lsb-release xdg-utils wget
```


并指定 `src/utils/getEraTxDate.js` 和 `src/utils/getLiteTxDate.js` 中 `args` 为 `['--no-sandbox', '--disable-setuid-sandbox']`.

安装

# 启动

```
npm run start
```

