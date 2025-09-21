export default interface ChatMessage {
  localId: number;
  url: string;
  contentText: string;
  contentTypeId: number;
  contentId: number;
  fromUserId: number;
  toUserId: number;
}
