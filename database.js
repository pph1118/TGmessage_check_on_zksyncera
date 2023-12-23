const fs = require('fs');
const path = require('path');

const walletsFilePath = path.join(__dirname, '..', '..', 'data', 'wallets.json');

const readWallets = () => {
  try {
    const walletsData = fs.readFileSync(walletsFilePath, 'utf8');
    return JSON.parse(walletsData);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {};
    }
    throw err;
  }
};

const writeWallets = (wallets) => {
  fs.writeFileSync(walletsFilePath, JSON.stringify(wallets, null, 2));
};

const addWallet = (chatId, wallet) => {
  const wallets = readWallets();
  if (wallets[chatId]) {
    wallets[chatId].push(wallet);
  } else {
    wallets[chatId] = [wallet];
  }
  writeWallets(wallets);
};

const removeWallet = (chatId, walletAddress) => {
  const wallets = readWallets();
  if (wallets[chatId]) {
    let note;
    wallets[chatId] = wallets[chatId].filter(
      (wallet) => {
        if (wallet.address !== walletAddress) {
          return true;
        } else {
          note = wallet.note;
          return false;
        }
      }
    );
    writeWallets(wallets);
    return note;
  }
};

const getUserWallets = (chatId) => {
  const wallets = readWallets();
  return wallets[chatId] || [];
};

module.exports = {
  addWallet,
  removeWallet,
  getUserWallets,
};
