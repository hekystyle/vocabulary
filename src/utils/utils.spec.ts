import {
  Definable,
  hasDefinition,
  computeAnswersAbsoluteScore,
} from "./utils";

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
