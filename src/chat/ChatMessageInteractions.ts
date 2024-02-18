import { DomChild } from "@common-module/app/lib/dom/DomNode.js";
import Author from "../database-interface/Author.js";

export default interface ChatMessageInteractions<ST> {
  openAuthorProfile: (author: Author) => void;
  getSourceLabel: (source: ST) => DomChild;
}
