import Author from "../database-interface/Author.js";

export default interface ChatMessageInteractions {
  openAuthorProfile: (author: Author) => void;
}
