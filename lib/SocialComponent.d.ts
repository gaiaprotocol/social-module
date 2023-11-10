import { DomNode } from "common-app-module";
export default class SocialComponent<EL extends HTMLElement = HTMLElement> extends DomNode<EL> {
    constructor(tag: string, ...nodes: (DomNode | string | undefined)[]);
    static loadMessages(): void;
}
//# sourceMappingURL=SocialComponent.d.ts.map