import fs from 'fs';
import path from 'path';
import { parseSubtitlesFileContent } from './parseSubtitles';

it('should parse example file', () => {
  const content = fs.readFileSync(path.join(__dirname, '__fixtures__', 'avatar.srt'), 'utf8');
  const result = parseSubtitlesFileContent(content);
  expect(result).toMatchSnapshot();
});
