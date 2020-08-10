export const getScrollTop = () => {
  if (!document.body) return 0;

  const scrollTop =
    document.documentElement?.scrollTop ?? document.body.scrollTop;
  return scrollTop;
};
