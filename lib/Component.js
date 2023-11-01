import DomNode from "../dom/DomNode.js";
export default class Component extends DomNode {
    constructor(tag, ...nodes) {
        super(tag + ".component");
        this.append(...nodes);
    }
}
//# sourceMappingURL=Component.js.map