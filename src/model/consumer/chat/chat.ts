export interface ViewChatMessage {
    id?: number;
    contentType: ContentType;
    contentId: number;
    text?: ChatText;
    voice?: Voice;
    photo?: Photo;
    fromUserId: number;
    toUserId: number;
    sendTime: Date;
    sending: boolean;
}

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

export enum ContentType {
    NONE,
    TEXT,
    IMAGE,
    VOICE,
    VIDEO,
}

export class ChatUtils {
    static indexToContentType(index: number): ContentType {
        const contentTypeString: string = ContentType[index];
        const contentType = contentTypeString as keyof typeof ContentType;
        return ContentType[contentType];
    }
}

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
    contentType: ContentType;
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
