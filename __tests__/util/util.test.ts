import "@testing-library/jest-dom";
import { classNames, contrastTextColor, hexColorCalculation } from "@/util/util";

describe("Utils", () => {

  describe(".classNames", () => {

    it("should return a string with the class name and state when the condition is true", () => {
      const result = "test-class test-class--active";
      const condition = true;
      const className = "test-class";
      const state = "active";

      expect(classNames(className, state, condition)).toEqual(result);
    });

    it("should return a string with the class name when the condition is false", () => {
      const result = "test-class";
      const condition = false;
      const className = "test-class";
      const state = "active";

      expect(classNames(className, state, condition)).toEqual(result);
    });
  });

  describe(".hexColorCalculation", () => {
    it("should return a hex color string", () => {
      const result = "#924436";
      const text = "test";

      const calculation = hexColorCalculation(text);

      expect(calculation).toEqual(result);
    });
  });

  describe(".contrastTextColor", () => {
    it("should return \"black\" when the hex color is light", () => {
      const result = "black";
      const hex = "#FFFFFF";

      const contrast = contrastTextColor(hex);

      expect(contrast).toEqual(result);
    });

    it("should return \"white\" when the hex color is dark", () => {
      const result = "white";
      const hex = "#000000";

      const contrast = contrastTextColor(hex);

      expect(contrast).toEqual(result);
    });
  });

});
