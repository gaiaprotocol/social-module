import SoFiComponent from "../SoFiComponent.js";
export default class ChatMessageList extends SoFiComponent {
    constructor(tag, options, interactions, loadingAnimation) {
        super(tag + ".chat-message-list");
        this.domElement.setAttribute("data-empty-message", options.emptyMessage);
    }
}
//# sourceMappingURL=ChatMessageList.js.map