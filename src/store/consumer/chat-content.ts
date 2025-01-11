import { defineStore } from "pinia";
import { ref } from "vue";
import ChatContent from "../../model/consumer/chat/chat-content";

export const useCounterStore = defineStore("chat-content", () => {
  const chatContentIdToChatContent = ref<Record<number, ChatContent>>({});

  function setChatContent(id: number, chatContent: ChatContent) {
    chatContentIdToChatContent.value[id] = chatContent;
  }
  function getChatContent(id: number): ChatContent {
    return chatContentIdToChatContent.value[id];
  }

  return { chatContentIdToChatContent, setChatContent, getChatContent };
});
