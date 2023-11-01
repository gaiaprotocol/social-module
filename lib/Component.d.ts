import DomNode from "../dom/DomNode.js";
export default class Component<EL extends HTMLElement = HTMLElement> extends DomNode<EL> {
    constructor(tag: string, ...nodes: (DomNode | string | undefined)[]);
}
//# sourceMappingURL=Component.d.ts.map