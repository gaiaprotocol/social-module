import { DomNode } from "@common-module/app";
export default class SoFiComponent<EL extends HTMLElement = HTMLElement> extends DomNode<EL> {
    constructor(tag: string, ...nodes: (DomNode | string | undefined)[]);
    static loadMessages(): void;
}
//# sourceMappingURL=SoFiComponent.d.ts.map