export default class AvatarUtil {
    static NOT_FOUND_USER_IMAGE = "/images/unknown-user.png";
    static async selectLoadable(target, images) {
        for (const image of images) {
            if (image) {
                try {
                    const response = await fetch(image, { method: "HEAD" });
                    if (response.ok && !target.deleted) {
                        target.style({ backgroundImage: `url('${image}')` });
                        return;
                    }
                }
                catch (error) {
                    console.error("Error fetching image:", error);
                }
            }
        }
        target.style({
            backgroundImage: `url('${AvatarUtil.NOT_FOUND_USER_IMAGE}')`,
        });
        console.warn("No valid images found");
    }
}
//# sourceMappingURL=AvatarUtil.js.map