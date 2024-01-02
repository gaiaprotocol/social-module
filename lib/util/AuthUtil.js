import { ErrorAlert, msg } from "@common-module/app";
export default class AuthUtil {
    static checkEmailAccess() {
        const params = new URLSearchParams(location.search);
        let message = params.get("error_description");
        if (message) {
            if (message === "Error getting user email from external provider") {
                message = msg("getting-email-from-x-error-message");
            }
            new ErrorAlert({
                title: msg("error-alert-title"),
                message,
            });
        }
    }
}
//# sourceMappingURL=AuthUtil.js.map