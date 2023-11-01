import { DomNode } from "common-app-module";

export default class SocialComponent<EL extends HTMLElement = HTMLElement>
  extends DomNode<EL> {
  constructor(tag: string, ...nodes: (DomNode | string | undefined)[]) {
    super(tag + ".social-component");
    this.append(...nodes);
  }
}
