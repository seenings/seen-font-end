import {Enum} from "enum-plus"

export const Sex = Enum({
    NONE: 0,
    MALE: 1,
    FEMALE: 2
})
export type SexKey = typeof Sex.keyType;
export type SexValue = typeof Sex.valueType;

// let a: SexKey = "NONE";
// let bn: SexValue = Sex.NONE;
// let cn: SexValue = Sex[a];
// let an: SexValue = 0;
// let b: SexKey = Sex.key(Sex.NONE)
// console.log(a);
// console.log(bn);
// console.log(cn);
// console.log(an);
// console.log(b);


export const MaritalStatus = Enum({
    "已婚": 0,
    "未婚": 1,
    "离异无孩": 2,
    "离异带孩": 3,
    "离异不带孩": 4,
    "丧偶": 5
})
export type MaritalStatusKey = typeof MaritalStatus.keyType;
export type MaritalStatusValue = typeof MaritalStatus.valueType;

export class UserUtils {
    static toMaritalStatuss(): Map<number, string> {
        const result = new Map<number, string>();
        MaritalStatus.values
            .forEach((value, key) => {
                result.set(key, value.key);
            })
        return result;
    }
}
