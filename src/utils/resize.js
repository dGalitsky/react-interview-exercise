/**
 * Get an URL for a resized picture, preseving aspect ratio
 *
 * @param {String} url Original URL
 * @param {Number} desiredWidth Resired width
 */
const resize = (url, desiredWidth) => {
  if (!url) return null;
  const match = url.match(
    /(https:\/\/picsum.photos\/id\/[0-9]+\/)([0-9]+)\/([0-9]+)/
  );
  if (!match || !desiredWidth) {
    return url;
  }

  const [, endpoint, width, height] = match;
  const ratio = parseInt(width) / parseInt(height);
  return `${endpoint}${desiredWidth}/${Math.round(desiredWidth / ratio)}`;
};

export default resize;
