// src/utils/markdown.js

const escapeMarkdownV2 = (text) => {
  const specialChars = /[_*\[\]()~>#\+\-=|{}.!]/g;
  return text.replace(specialChars, '\\$&');
};

module.exports = {
  escapeMarkdownV2,
};
