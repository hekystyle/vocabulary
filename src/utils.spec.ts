import { shuffle, sortImmutable } from "./utils";

describe("shuffle", () => {
  const getDummy = () => [1, 2, 3, 4];
  it("return new instance", () => {
    const dummy = getDummy();
    const actual = shuffle(dummy);
    expect(actual).not.toBe(dummy);
  });
});

describe("sortImmutable", () => {
  it("return new instance", () => {
    const array: never[] = [];
    const actual = sortImmutable(array);
    expect(actual).not.toBe(array);
  });
});
