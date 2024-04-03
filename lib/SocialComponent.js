import { DomNode } from "@common-module/app";
export default class SocialComponent extends DomNode {
    constructor(tag, ...nodes) {
        super(tag + ".social-component");
        this.append(...nodes);
    }
}
//# sourceMappingURL=SocialComponent.js.map