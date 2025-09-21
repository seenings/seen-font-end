import {Enum} from "enum-plus";

export class Device {
  /**
   * 设备信息
   */
  userAgent: string;
  /**
   * 平台信息
   */
  platform: PlatformValue;

  constructor(userAgent: string, platform: PlatformValue) {
    this.userAgent = userAgent;
    this.platform = platform;
  }

  /**
   * 判断是否是pc端
   */
  isPc(): boolean {
    return !this.isMobile();
  }

  /**
   * 判断是否是移动端
   */
  isMobile(): boolean {
    return this.userAgent.includes("Mobile");
  }

  /**
   * 安卓
   */
  isAndroid(): boolean {
    return this.platform === Platform.Android;
  }

  /**
   * 苹果
   */
  isIos(): boolean {
    return this.platform === Platform.Ios;
  }

  /**
   * web
   */
  isWeb(): boolean {
    return this.platform === Platform.Web;
  }
}

/**
 * 平台
 */
export const Platform = Enum({
  Android:0,
  Ios:1,
  Web:2,
})
export type PlatformKey = typeof Platform.keyType;
export type PlatformValue = typeof Platform.valueType;
