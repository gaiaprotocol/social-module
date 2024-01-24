import { DomNode } from "@common-module/app";

export default class AvatarUtil {
  public static NOT_FOUND_USER_IMAGE = "/images/unknown-user.png";

  public static async selectLoadable(
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
    if (!target.deleted) {
      target.style({
        backgroundImage: `url('${AvatarUtil.NOT_FOUND_USER_IMAGE}')`,
      });
    }
    console.warn("No valid images found");
  }
}
