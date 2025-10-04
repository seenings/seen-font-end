import type {EducationValue} from "../school/Education.ts";
import type {Sex} from "./Sex.ts";

export interface BasicInfo {
    /**
     * 用户ID
     */
    userId?: number;

    /**
     * 性别
     */
    sex?: typeof Sex.valueType;

    /**
     * 学历
     */
    education?: EducationValue;

    /**
     * 出生年份
     */
    birthYear?: number;

    /**
     * 已毕业
     */
    graduated?: boolean;
}

/**
 * 用户介绍的资料
 */
export interface UserIntroduceInfo {
    /**
     * 用户ID
     */
    userId: number;
    /**
     * 用户认证
     */
    userAuthId: number;
    /**
     * 昵称
     */
    aliasName: string;
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
     * 星座
     */
    constellation: string;
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
     * 就读学校
     */
    schoolName: string;
    /**
     * 职业
     */
    workPositionName?: string;
    /**
     * 工作公司
     */
    workCompanyName: string;
}
