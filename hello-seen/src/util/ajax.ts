import type { AxiosResponse, RawAxiosRequestConfig } from "axios";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { showNotify } from "vant";
import { R, ResultErrorType, StatusCode } from "../model/sys/api-result";
import { EnvService } from "../service/sys/env";

export class Ajax {
  env: EnvService;

  constructor(env: EnvService) {
    this.env = env;
  }

  /**
   * http请求
   * @param config    配置
   * @param resultErrorType   结果失败时，弹窗的类型处理
   */
  request<T>(
    config: RawAxiosRequestConfig,
    resultErrorType: ResultErrorType = "error"
  ): Promise<R<T>> {
    config.url = this.env.getBaseUrl() + "/seen" + config.url;
    let headers = config.headers;
    if (!headers || typeof headers === "undefined") {
      headers = new AxiosHeaders();
    }
    const clientTokenName: string = this.env.getClientTokenName();
    const clientToken: string = this.env.getClientToken();
    headers instanceof AxiosHeaders &&
      headers.set(clientTokenName, clientToken, true);
    config.headers = headers;
    return new Promise<R<T>>((resolve, reject) => {
      axios
        .request<R<T>>(config)
        .then((response: AxiosResponse<R<T>>) => {
          // response类型就是AxiosResponse<Response<T>>，而data类型就是我们指定的Response<T>
          // 请求成功后就我们的数据从response取出并使返回的promise实例的状态变为成功的
          const token: string = response.headers[this.env.getClientTokenName()];
          if (token) {
            this.env.setClientToken(token);
          }
          const r: R<T> = response.data;
          if ((r.code as StatusCode) === StatusCode.ERROR) {
            switch (resultErrorType) {
              case "error":
                showNotify({ message: r.msg, type: "danger" });
                break;
              case "warning":
                showNotify({ message: r.msg, type: "warning" });
                break;
              case "none":
              default:
            }
          }
          resolve(response.data);
        })
        .catch((error: Error) => {
          if (error instanceof AxiosError && error?.response?.status === 401) {
            document.location.href = "/";
          }
          console.log(error.message);
          // 请求失败的处理，打印消息。
          showNotify({
            message: "网络连接失败，请检查后重试！",
            type: "danger",
          });
          reject(error);
        });
    });
  }
}
