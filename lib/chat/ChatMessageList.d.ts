import { DomChild } from "common-app-module/lib/dom/DomNode.js";
import SoFiComponent from "../SoFiComponent.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";
export default abstract class ChatMessageList extends SoFiComponent {
    constructor(tag: string, options: {
        storeName?: string;
        signedUserId?: string;
        emptyMessage: string;
    }, interactions: ChatMessageInteractions, loadingAnimation: DomChild);
}
//# sourceMappingURL=ChatMessageList.d.ts.map