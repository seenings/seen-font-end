import { Env } from "./env";

export class UrlUtils {
  /**
   * 根据相对url获取全路径url
   * @param env 环境
   * @param relationUrl 相对路径url
   * @return 全路径url
   */
  static relationUrlToFullPathUrl(env: Env, relationUrl: string): string {
    if (relationUrl == null || !relationUrl) {
      return "";
    }
    const queryParam =
      "?" + env.getClientTokenName() + "=" + env.getClientToken();
    return env.getBaseUrl() + relationUrl + queryParam;
  }
}
