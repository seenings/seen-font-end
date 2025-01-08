export type UserAuthEnum = string | "NoAuth" | "HaveAuth";

export interface UserMainInfo {
  userId: number;
  mainPhotoId: number;

  userAuthEnum: UserAuthEnum;
  /**
   * 昵称
   */
  aliasName: string;

  currentResidenceProvinceName: string;
  /**
   * 现居城市名
   */
  currentResidenceCityName: string;
  /**
   * 出生省份名
   */
  birthPlaceProvinceName: string;
  /**
   * 出生城市名
   */
  birthPlaceCityName: string;
  /**
   * 出生年份
   */
  birthYear: number;

  /**
   * 体重（千克）
   */
  weightKg: number;

  /**
   * 身高（厘米）
   */
  statureCm: number;

  /**
   * 学历
   */
  educationId: number;

  /**
   * 职业
   */
  workPositionName: string;
}
