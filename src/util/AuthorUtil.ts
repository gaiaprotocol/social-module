import { DomNode } from "common-app-module";

export default class AuthorUtil {
  public static async selectLoadableAvatar(
    target: DomNode,
    images: (string | undefined)[],
  ) {
    for (const image of images) {
      if (image) {
        try {
          const response = await fetch(image, { method: "HEAD" });
          if (response.ok && !target.deleted) {
            target.style({ backgroundImage: `url('${image}')` });
            return;
          }
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    }
    console.warn("No valid images found");
  }
}
