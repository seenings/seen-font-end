import { describe, expect, it } from "vitest";
import { Education } from "../../main/ts/model/consumer/school/Education";
import { MaritalStatus, UserUtils } from "../../main/ts/model/consumer/user-info/Sex";
import { RecordUtils } from "../../main/ts/util/record-util";

describe("Education.ts", () => {
  it("post 学历 when passed", () => {
    let j = 0;
    for (const educationKey in Education) {
      console.log(++j + "key:" + educationKey);
    }
    expect(2).toEqual(Education["学士"]);
    expect(Education["学士"]).toEqual(2);
    expect("学士").toEqual(Education.key(2));
    expect("硕士").toEqual(Education.key(3));
    expect("硕士").toEqual(Education.key(3));
  });
});

describe("Sex.ts", () => {
  it("post 婚姻状况 when passed", () => {
    console.log(UserUtils.toMaritalStatuss());
    console.log(Object.entries(MaritalStatus));

    for (let i = 0; i < Object.values(MaritalStatus).length; i++) {
      const value = Object.values(MaritalStatus)[i];
      console.log(i + ":" + value);
    }
    let j = 0;
    for (const maritalStatusKey in MaritalStatus) {
      console.log(++j + "key:" + maritalStatusKey);
    }

    expect(MaritalStatus["离异无孩"]).toEqual(
        MaritalStatus["离异无孩"]
    );
    expect(2).toEqual(MaritalStatus["离异无孩"]);
    expect(MaritalStatus["离异无孩"]).toEqual(2);
    expect("离异无孩").toEqual(MaritalStatus.key(2));
  });
});

describe("record-util.ts", () => {
  it("post 遍历value找text when passed", () => {
    const options = [
      { value: 1, text: "t1" },
      { value: 2, text: "t2" },
    ];
    const text = RecordUtils.valueToText(options, 1);
    console.log(text);
    expect("t1").toEqual(text);
  });
});
