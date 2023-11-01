import { ErrorAlert } from "common-app-module";
export default class AuthUtil {
    static checkEmailAccess() {
        const params = new URLSearchParams(location.search);
        let message = params.get("error_description");
        if (message) {
            if (message === "Error getting user email from external provider") {
                message +=
                    ".\nPlease add an email in your X account settings and allow email access.";
            }
            new ErrorAlert({
                title: "Error",
                message,
            });
        }
    }
}
//# sourceMappingURL=AuthUtil.js.map