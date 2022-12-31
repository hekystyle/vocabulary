export const parseSubtitlesFileContent = (content: string): Map<string, string> => {
  const chunks = content.split(/\r?\n\r?\n/g).filter(chunk => chunk);

  return chunks.reduce<Map<string, string>>((map, chunk) => {
    const [, , ...formattedTexts] = chunk.split(/\r?\n/g);

    const text = formattedTexts.map(formattedText => formattedText.replace(/<[^>]*>/g, '')).join(' ');

    return text
      .split(' ')
      .filter(word => ![':'].includes(word))
      .reduce((innerMap, word) => {
        const normalizedWord = word
          .replace(/^[("'#,]+/, '')
          .replace(/[)"':]+$/, '')
          .replace(/\.\.\./g, '')
          .replace(/[.,?!]$/g, '')
          .replace(/('m|'s|'re|'ve|'d|'ll)$/g, '');

        const key = normalizedWord.toLowerCase();
        innerMap.set(key, normalizedWord);

        return innerMap;
      }, map);
  }, new Map());
};
