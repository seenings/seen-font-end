import {Enum} from "enum-plus";

export const Education = Enum({
    /**
     * 其他
     */
    "其他": 0,
    /**
     * 大专
     */
    "大专": 1,
    /**
     * 学士
     */
    "学士": 2,
    /**
     * 硕士
     */
    "硕士": 3,

    /**
     * 博士
     */
    "博士": 4
})
export type EducationKey = typeof Education.keyType;
export type EducationValue = typeof Education.valueType;
