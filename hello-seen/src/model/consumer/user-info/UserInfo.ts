import type { Sex } from "./Sex";

export interface UserInfo {
  userId: number;
  aliasName: string;
  sex: Sex;
  mainPhotoId: number;
}

/**
 * 用户介绍的大段信息
 */
export interface PersonIntroduce {
  /**
   * 介绍标题ID
   */
  introduceTypeId: number;
  /**
   * 介绍标题
   */
  introduceTitle: string;
  /**
   * 介绍内容
   */
  introduceContent: string;
  /**
   * 介绍的照片
   */
  orderToPhotoIdMap: Record<number,number>;
}

export interface UserChatInfo {
  userId: number;
  aliasName: string;
  sex: Sex;
  mainPhotoId: number;
  newestChatText: string;
  newestChatTime: Date;
}
