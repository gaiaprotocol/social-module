import SoFiComponent from "../SoFiComponent.js";
import Message from "../database-interface/Message.js";

export default class ChatMessageListItem extends SoFiComponent {
  constructor(message: Message) {
    super(".chat-message-list-item");
  }
}
