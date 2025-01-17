import { describe, expect, it } from "vitest";
import { RecordUtils } from "../../util/record-util";

describe("record-util.ts", () => {
  it("遍历value找text", () => {
    const options = [
      { value: 1, text: "t1" },
      { value: 2, text: "t2" },
    ];
    const text = RecordUtils.valueToText(options, 1);
    expect("t1").toEqual(text);
  });
  it("Record转PickerOption", () => {
    const r = { 1: "t1", 2: "t2" };
    const options = RecordUtils.recordToPickerOption(r);
    expect(options[0].text).toEqual("t1");
    expect(options[0].value).toEqual("1");
  });
  it("Record转Map", () => {
    const r = { 1: "t1", 2: "t2" };
    const options = RecordUtils.recordToMap(r);
    expect("t1").toEqual(options.get("1"));
    expect(2).toEqual(options.size);
  });
});
