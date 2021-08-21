import {
  Definable,
  shuffle,
  sortImmutable,
  hasDefinition,
  computeAnswersAbsoluteScore,
  AnswersCountable,
  answersComparer,
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
      const actual = computeAnswersAbsoluteScore({
        answersCount: total,
        correctAnswersCount: correct,
      });
      expect(actual).toBe(expected);
    }
  );
});

describe("answersComparer", () => {
  it("should prefer less score", () => {
    const a: AnswersCountable = { answersCount: 5, correctAnswersCount: 0 };
    const b: AnswersCountable = { answersCount: 3, correctAnswersCount: 0 };
    const actual = answersComparer(a, b);
    expect(actual).toBeLessThanOrEqual(-1);
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
