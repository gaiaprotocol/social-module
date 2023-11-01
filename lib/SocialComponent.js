import { DomNode } from "common-app-module";
export default class SocialComponent extends DomNode {
    constructor(tag, ...nodes) {
        super(tag + ".social-component");
        this.append(...nodes);
    }
}
//# sourceMappingURL=SocialComponent.js.map