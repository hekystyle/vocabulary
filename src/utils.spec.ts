import { Definable, shuffle, sortImmutable, hasDefinition } from "./utils";

describe("shuffle", () => {
  it("should be immutable", () => {
    const array: never[] = [];
    const actual = shuffle(array);
    expect(actual).not.toBe(array);
  });
});

describe("sortImmutable", () => {
  it("should be immutable", () => {
    const array: never[] = [];
    const actual = sortImmutable(array);
    expect(actual).not.toBe(array);
  });
});

test.todo('prepareAnswersSet()');

test.todo('answersComparer()');

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
