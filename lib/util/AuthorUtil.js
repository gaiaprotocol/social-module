export default class AuthorUtil {
    static async selectLoadableProfileImage(target, images) {
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
        console.warn("No valid images found");
    }
}
//# sourceMappingURL=AuthorUtil.js.map