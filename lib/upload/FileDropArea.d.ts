import SocialComponent from "../SocialComponent.js";
export default class FileDropArea<EL extends HTMLElement = HTMLElement> extends SocialComponent<EL> {
    constructor(tag: string, onDrop: (files: File[]) => void);
    private highlight;
    private unhighlight;
}
//# sourceMappingURL=FileDropArea.d.ts.map