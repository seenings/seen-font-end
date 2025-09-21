import {Enum} from "enum-plus";

export const EnvProfile = Enum( {
  PROD:0,
  PRE:1,
  UAT:2,
  LOCAL:3,
  CHIXH_DOCKER:4,
})

export type EnvProfileKey = typeof EnvProfile.keyType;
export type EnvProfileValue = typeof EnvProfile.valueType;
export class EnvService {
  // 字段
  tokenName: string;
  baseUrl: string;
  imageUrl: string;
  envProfile: EnvProfileValue;
  version: string;

  // 构造函数
  constructor(
    tokenName: string,
    baseUrl: string,
    imageUrl: string,
    envProfile: EnvProfileValue,
    version: string
  ) {
    this.tokenName = tokenName;
    this.baseUrl = baseUrl;
    this.imageUrl = imageUrl;
    this.envProfile = envProfile;
    this.version = version;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getClientTokenName(): string {
    return this.tokenName;
  }

  getClientToken(): string {
    const item = localStorage.getItem(this.tokenName);
    if (item == null) {
      return "";
    }
    return item;
  }

  isPre(): boolean {
    return this.envProfile === EnvProfile.PRE;
  }

  isProd(): boolean {
    return this.envProfile === EnvProfile.PROD;
  }

  isLocal(): boolean {
    return (
      this.envProfile === EnvProfile.LOCAL ||
      this.envProfile === EnvProfile.CHIXH_DOCKER
    );
  }

  setClientToken(token: string) {
    localStorage.setItem(this.tokenName, token);
  }

  /**
   * 清除token
   */
  removeClientToken(): void {
    localStorage.removeItem(this.tokenName);
  }

  getVersion(): string {
    return this.version;
  }
}
