export const isGurmukhi = (str) => /[\u0A00-\u0A7F]/.test(str);

export const isValidGurbaniAkhar = (str) => {
  return /^[a-zA-Z &<>@|~¡¤§®°`´µ¿ÅÆæÇÍÎÏÒœˆ˜†₈ü^¨\[]+$/.test(str);
};

export const hasSpaceBeforePeriod = (str) => {
  const s = str.trim();
  if (s[s.length - 1] !== '।') return true;
  return s[s.length - 2] === ' ';
};

export const onlyNumbers = (str) => /^[0-9]+$/.test(str);
