import {
  Definable,
  shuffle,
  sortImmutable,
  hasDefinition,
  computeAnswersScore,
} from "./utils";

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

test.todo("prepareAnswersSet()");

describe("computeAnswersScore", () => {
  it.each([
    [4, 2, 2],
    [3, 2, 1],
    [2, 2, 0],
    [0, 0, 0],
  ])(
    "should return %p for %p total answers count and %p correct answers count",
    (expected, total, correct) => {
      const actual = computeAnswersScore({
        answersCount: total,
        correctAnswersCount: correct,
      });
      expect(actual).toBe(expected);
    }
  );
});

describe("answersComparer", () => {
  it.todo('should prefer answers with less score');
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
