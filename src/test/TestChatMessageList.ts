import ChatMessageInteractions from "../chat/ChatMessageInteractions.js";
import ChatMessageList from "../chat/ChatMessageList.js";
import Author from "../database-interface/Author.js";
import Message from "../database-interface/Message.js";

class TestChatMessageInteractions implements ChatMessageInteractions {
  public openAuthorProfile(author: Author) {
    throw new Error("Method not implemented.");
  }
}

export default class TestChatMessageList extends ChatMessageList {
  constructor() {
    super(
      ".test-chat-message-list",
      {
        storeName: "global-posts",
        emptyMessage: "No posts yet. Be the first to post!",
      },
      new TestChatMessageInteractions(),
      "Loading...",
    );
  }

  protected fetchMessages(): Promise<Message[]> {
    throw new Error("Method not implemented.");
  }
}
