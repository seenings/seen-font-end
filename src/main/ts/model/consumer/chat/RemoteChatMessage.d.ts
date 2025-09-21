export default interface RemoteChatMessage {
  id: number;
  contentTypeId: number;

  contentId: number;

  fromUserId: number;
  sendTime: Date;
  sent: boolean;
  toUserId: number;
}
