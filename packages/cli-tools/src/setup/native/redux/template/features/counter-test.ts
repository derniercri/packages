const generateFeatureTest = () => `import counter, { increment, decrement } from "./counter";

describe("Counter", function () {
  describe("Actions", () => {
    it("increment action should return correct action", () => {
      expect(increment()).toEqual({
        type: "counter/increment",
      });
    });
    it("decrement action should return correct action", () => {
      expect(decrement()).toEqual({
        type: "counter/decrement",
      });
    });
  });

  describe("Reducers", () => {
    it("counter reducer should increment", () => {
      expect(
        counter(12, {
          type: "counter/increment",
        })
      ).toEqual(13);
    });
    it("counter reducer should decrement", () => {
      expect(
        counter(23, {
          type: "counter/decrement",
        })
      ).toEqual(22);
    });
  });
});
`;

export default generateFeatureTest;
