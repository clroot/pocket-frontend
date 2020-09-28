export const getScrollTop = () => {
  if (!document.body) return 0;

  const scrollTop =
    document.documentElement?.scrollTop ?? document.body.scrollTop;
  return scrollTop;
};

export const encodeBase64 = (string) => {
  const buffer = Buffer.from(string);
  return buffer.toString('base64');
};

export const decodeBase64 = (string) => {
  const buffer = Buffer.from(string, 'base64');
  return buffer.toString();
};
