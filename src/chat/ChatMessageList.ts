import SoFiComponent from "../SoFiComponent.js";

export default class ChatMessageList extends SoFiComponent {
  constructor(
    options: {
      storeName?: string;
      signedUserId?: string;
      emptyMessage: string;
    },
  ) {
    super(".chat-message-list");
  }
}
