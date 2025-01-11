export interface IntroduceTypeAndPhotoUrl {
  introduceTypeEnum: IntroduceTypeEnum;
  longPhotoUrl: string;
}

export enum IntroduceTypeEnum {
  MAIN_PAGE,
  PERSON_INTRODUCE,
  FAMILY_INTRODUCE,
  INTEREST,
  OTHER_HALF,
  VIEW_POINT_OF_LOVE,
  YEARNING_FOR_THE_FUTURE,
}
