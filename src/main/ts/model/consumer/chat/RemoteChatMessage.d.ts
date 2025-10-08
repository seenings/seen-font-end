import type {ContentTypeValue} from "./chat.ts";

export default interface RemoteChatMessage {
  id: number;
  contentTypeId: ContentTypeValue;

  contentId: number;

  fromUserId: number;
  sendTime: Date;
  sent: boolean;
  toUserId: number;
}
