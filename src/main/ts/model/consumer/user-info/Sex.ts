import {Enum} from "enum-plus"

export const Sex = Enum({
    NONE: {value: 0, label: '无'},
    MALE: {value: 1, label: '男'},
    FEMALE: {value: 2, label: '女'}
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
let data: string = Sex.items[Sex.MALE]?.label + '生';
console.log(data)
data = Sex.items[Sex["MALE"]]?.label + '生';
console.log(data)


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
        MaritalStatus.keys.forEach((key) => {
            result.set(MaritalStatus[key], key);
        })
        return result;
    }
}
