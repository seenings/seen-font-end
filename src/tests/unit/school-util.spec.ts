import { describe, expect, it } from "vitest";
import { Education } from "../../model/consumer/school/Education";
import { MaritalStatus, UserUtils } from "../../model/consumer/user-info/Sex";
import { SchoolUtils } from "../../util/consumer/school/school-util";
import { RecordUtils } from "../../util/record-util";

describe("Education.ts", () => {
  it("post 学历 when passed", () => {
    for (let i = 0; i < Object.values(Education).length; i++) {
      const value = Object.values(Education)[i];
    }
    let j = 0;
    for (const educationKey in Education) {
      console.log(++j + "key:" + educationKey);
    }
    expect("学士").toEqual(SchoolUtils.educationToName(Education["学士"]));
    expect(2).toEqual(SchoolUtils.educationToId(Education["学士"]));
    expect(Education["学士"]).toEqual(SchoolUtils.nameToEducation("学士"));
    expect(2).toEqual(SchoolUtils.nameToId("学士"));
    expect(Education["学士"]).toEqual(SchoolUtils.idToEducation(2));
    expect("学士").toEqual(SchoolUtils.idToName(2));
    expect("硕士").toEqual(SchoolUtils.idToName(3));
    expect("硕士").toEqual(SchoolUtils.idToName(3));
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
    expect("离异无孩").toEqual(
      UserUtils.maritalStatusToName(MaritalStatus["离异无孩"])
    );
    expect(2).toEqual(UserUtils.maritalStatusToId(MaritalStatus["离异无孩"]));
    expect(MaritalStatus["离异无孩"]).toEqual(
      UserUtils.nameToMaritalStatus("离异无孩")
    );
    expect(2).toEqual(UserUtils.nameToId("离异无孩"));
    expect(MaritalStatus["离异无孩"]).toEqual(UserUtils.idToMaritalStatus(2));
    expect("离异无孩").toEqual(UserUtils.idToName(2));
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
