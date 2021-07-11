import { shuffle } from "./utils";

describe('shuffle', () => {
    const getDummy = () => [1, 2, 3, 4];
    it('return new instance', () => {
        const dummy = getDummy();
        const actual = shuffle(dummy);
        expect(actual).not.toBe(dummy);
    });
});
