export default interface ChatContent {
  /**
   * 聊天内容ID
   */
  id: number;
  contentTypeId: number;
  contentId: number;
  /**
   * 自己发送的消息
   */
  selfSend: boolean;
  otherUserId: number;
}
