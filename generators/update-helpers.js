module.exports = {
  getSubContent(originalContent, index, endText) {
    if (!endText) {
      return { content: originalContent.substr(index), endIndex: originalContent.length };
    }
    const endIndex = originalContent.lastIndexOf(endText);
    const content = originalContent.substring(index, endIndex);
    return { content, endIndex };
  },
  update(
    originalContent,
    currentContent,
    index,
    subContentEndTextToMatch,
    lineEndToMatch,
    getTextToInsert,
    indexOffset = 0
  ) {
    let sub = this.getSubContent(originalContent, index, subContentEndTextToMatch);
    const offset = indexOffset || lineEndToMatch.length;
    let endIndex = sub.content.lastIndexOf(lineEndToMatch);
    if (endIndex === -1) {
      return { content: '', index: -1 };
    }
    endIndex += offset;
    const textToInsert = getTextToInsert();
    const content = currentContent + sub.content.substring(0, endIndex) + textToInsert + sub.content.substr(endIndex);
    const newIndex = sub.endIndex;
    return { content, index: newIndex };
  },
};
