import { describe, expect, it } from "vitest";
import { Util } from "../../main/ts/util/common-util";

describe("common-util.ts", () => {
  const code = "世界你好，hello world";
  const result = 21;
  it("post res when passed", () => {
    expect(Util.actualLength(code)).toEqual(result);
  });
  it("split str when passed", () => {
    const testData = [
      {
        str: "您好，你是谁，你在干什么，你是做什么的。",
        lineLength: 10,
        result: ["您好，你是", "谁，你在干", "什么，你是", "做什么的。"]
      },
      {
        str: "您好，你是谁，you在干什么，你是做什么的。",
        lineLength: 10,
        result: ["您好，你是", "谁，you在", "干什么，你", "是做什么的", "。"]
      }
    ];
    testData.forEach(({ str, lineLength, result }) => {
      expect(Util.split(str, lineLength)).toEqual(result);
    });
  });
});
