import {
  Definable,
  shuffle,
  sortImmutable,
  hasDefinition,
} from "./utils";

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

describe("hasDefinition", () => {
  it.each([
    ["", false],
    ["some def ...", true],
    [" ", true],
  ])("should for %p return %p", (def, expected) => {
    const definable: Definable = { definition: def };
    const actual = hasDefinition(definable);
    expect(actual).toBe(expected);
  });
});
