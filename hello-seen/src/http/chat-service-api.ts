export const API_CHAT = {
  pageToUserChatInfo: {
    url: "/seen/rest-v1/chat/chat-user/page-to-user-chat-info",
    method: "post",
  },
  selfUserIdToRecInfo: {
    url: "/rest-v1/chat/friend-info/self-user-id-to-rec-info",
    method: "post",
  },
  selfUserIdToSendInfo: {
    url: "/rest-v1/chat/friend-info/self-user-id-to-send-info",
    method: "post",
  },
  sendChatTextMessage: {
    url: "/seen/rest-v1/chat/chat-user/send-chat-text-message",
    method: "post",
  },
  sendVoiceMessage: {
    url: "/seen/rest-v1/chat/chat-user/send-voice-message",
    method: "post",
  },
  sendPhotoMessage: {
    url: "/seen/rest-v1/chat/chat-user/send-photo-message",
    method: "post",
  },
  historyIdToRemoteChatMessage: {
    url: "/seen/rest-v1/chat/chat-user/history-id-to-remote-chat-message",
    method: "post",
  },
  userIdToHistoryId: {
    url: "/rest-v1/chat/chat-user/user-id-to-history-id",
    method: "post",
  },
};
