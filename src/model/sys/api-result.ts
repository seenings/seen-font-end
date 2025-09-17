export const StatusCode = {
    ERROR: 0,
    SUCCESS: 1
}

export interface R<T> {
    /**
     * 状态码
     */
    code: 0 | 1;
    /**
     * 消息
     */
    msg: string;
    /**
     * 数据
     */
    data: T;
}


export type ResultErrorType = "error" | "warning" | "none";
