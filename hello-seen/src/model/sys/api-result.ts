export interface R<T> {
  /**
   * 状态码
   */
  code: number;
  /**
   * 消息
   */
  msg: string;
  /**
   * 数据
   */
  data: T;
}

export enum StatusCode {
  ERROR,
  SUCCESS,
}

export type ResultErrorType = "error" | "warning" | "none";
