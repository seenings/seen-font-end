import {Enum} from "enum-plus";

export interface IntroduceTypeAndPhotoUrl {
  introduceTypeEnum: IntroduceTypeEnumValue;
  longPhotoUrl: string;
}

export const IntroduceTypeEnum = Enum({
  MAIN_PAGE:0,
  PERSON_INTRODUCE:1,
  FAMILY_INTRODUCE:2,
  INTEREST:3,
  OTHER_HALF:4,
  VIEW_POINT_OF_LOVE:5,
  YEARNING_FOR_THE_FUTURE:6,
})
export type IntroduceTypeEnumKey = typeof IntroduceTypeEnum.keyType;
export type IntroduceTypeEnumValue = typeof IntroduceTypeEnum.valueType;
