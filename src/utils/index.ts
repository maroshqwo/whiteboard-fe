export const getNumberFromPx = (px: string) => {
  return parseInt(px.replace("px", ""), 10);
};