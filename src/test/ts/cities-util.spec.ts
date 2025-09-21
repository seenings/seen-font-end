import { describe, expect, it } from "vitest";
import type{ CascaderString } from "../../main/ts/model/sys/option";
import { CitiesUtils } from "../../main/ts/util/cities-util";

describe("cities-util.ts", () => {
  it("遍历value找text", () => {
    const options: CascaderString[] = [
      { v: "1", t: "t1", c: [{ v: "12", t: "z1", c: [] }] },
      { v: "2", t: "t2", c: [] }
    ];
    expect("t1～z1").toEqual(CitiesUtils.valuesToText(options, ["1", "12"]));
    expect("t2").toEqual(CitiesUtils.valuesToText(options, ["2", ""]));
  });
  it("遍历value找text", () => {
    const options: CascaderString[] = [
      { v: "1", t: "t1", c: [{ v: "12", t: "z1", c: [] }] },
      { v: "2", t: "t2", c: [] }
    ];
    expect("t1～z1").toEqual(CitiesUtils.valuesToText(options, ["1", "12"]));
    expect("t2").toEqual(CitiesUtils.valuesToText(options, ["2", ""]));
  });
});
