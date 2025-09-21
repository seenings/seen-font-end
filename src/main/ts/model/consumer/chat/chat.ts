import {Enum} from "enum-plus";


export interface ChatText {
    id: number;
    content: string;
}

export interface Voice {
    id: number;
    url: string;
    blankText: string;
}

export interface Photo {
    id: number;
    file: File | null;
    url: string;
}

export const ContentType = Enum({
    NONE: 0,
    TEXT: 1,
    IMAGE: 2,
    VOICE: 3,
    VIDEO: 4,

})
export type ContentTypeKey = typeof ContentType.keyType;
export type ContentTypeValue = typeof ContentType.valueType;

/**
 * 本地消息
 */
export interface LocalChatMessage {
    /**
     * 远程ID
     */
    remoteId: number | null;
    /**
     * 内容类型
     */
    contentType: ContentTypeValue;
    /**
     * 文本消息
     */
    text: string;
    /**
     * 语音、视频、图片
     */
    file: File | null;
    /**
     * 发送时间
     */
    sendTime: Date;
}
