function removeDash(text) {
  return text.replace(/-/g, ' ').replace(/—/g, ' ');
}
module.exports = removeDash;
