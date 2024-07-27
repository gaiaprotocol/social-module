import { DomNode } from "@common-module/app";

export default class SocialComponent<EL extends HTMLElement = HTMLElement>
  extends DomNode<EL> {
  constructor(tag: string, ...nodes: (DomNode | string | undefined)[]) {
    super(tag + ".social-component");
    this.append(...nodes);
  }
}
