const numToGurmukhi = (num) => {
  const mappings = {
    0: '੦',
    1: '੧',
    2: '੨',
    3: '੩',
    4: '੪',
    5: '੫',
    6: '੬',
    7: '੭',
    8: '੮',
    9: '੯',
  };
  return num
    .toString()
    .split('')
    .map((c) => mappings[c])
    .join('');
};

const getFormattedSignatureObj = (num) => {
  if (num == null || num === 0) return;
  return {
    signature_unicode: `॥${numToGurmukhi(num)}॥`,
    signature_gs: `]${num}]`,
    signature_english: `||${num}||`,
  };
};

module.exports = { getFormattedSignatureObj };
