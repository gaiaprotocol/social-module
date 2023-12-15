import ChatMessageList from "../chat/ChatMessageList.js";
class TestChatMessageInteractions {
    openAuthorProfile(author) {
        throw new Error("Method not implemented.");
    }
    getSourceLabel = (source) => {
        switch (source) {
            case 0:
                return "Source 0";
            case 1:
                return "Source 1";
            case 2:
                return "Source 2";
            default:
                return "Source default";
        }
    };
}
export default class TestChatMessageList extends ChatMessageList {
    constructor() {
        super(".test-chat-message-list", {
            storeName: "global-posts",
            emptyMessage: "No posts yet. Be the first to post!",
        }, new TestChatMessageInteractions(), "Loading...");
    }
    async fetchMessages() {
        return [{
                id: 0,
                source: 0,
                author: {
                    user_id: "test",
                    display_name: "test",
                    x_username: "test",
                    profile_image_thumbnail: "",
                },
                message: "Another big quality update:\n\nWe’ve enhanced the open source scoring algorithm’s ability to spot potentially inaccurate or unsupported notes. How it works: The algorithm identifies notes that people from a wide range of viewpoints agree have potential issues with accuracy or source support. It then identifies raters who consistently and precisely spot such notes, and assigns them extra weight, enabling faster and more precise identification of notes with these issues.\n\nRaters are effectively given more weight for being diligent about vetting details of notes and following the cited sources to verify. Quick ratings that miss errors in notes, or that excessively rate notes as erroneous, lead to reduced weight. The more diligent you are as a rater, the more impact you can have.\n\nThe precision of this new approach not only results in additional helpful and informative notes being displayed on X, it also identifies more notes that people from different points of view agree have possible accuracy or source support problems.",
                rich: {
                    files: [{
                            fileName: "test.svg",
                            fileType: "image/svg+xml",
                            url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg",
                            fileSize: 0,
                        }],
                },
                created_at: new Date().toISOString(),
            }, {
                id: 1,
                source: 0,
                author: {
                    user_id: "test",
                    display_name: "test",
                    x_username: "test",
                    profile_image_thumbnail: "",
                },
                message: "Another big quality update:\n\nWe’ve enhanced the open source scoring algorithm’s ability to spot potentially inaccurate or unsupported notes. How it works: The algorithm identifies notes that people from a wide range of viewpoints agree have potential issues with accuracy or source support. It then identifies raters who consistently and precisely spot such notes, and assigns them extra weight, enabling faster and more precise identification of notes with these issues.\n\nRaters are effectively given more weight for being diligent about vetting details of notes and following the cited sources to verify. Quick ratings that miss errors in notes, or that excessively rate notes as erroneous, lead to reduced weight. The more diligent you are as a rater, the more impact you can have.\n\nThe precision of this new approach not only results in additional helpful and informative notes being displayed on X, it also identifies more notes that people from different points of view agree have possible accuracy or source support problems.",
                rich: {
                    files: [{
                            fileName: "test.svg",
                            fileType: "image/svg+xml",
                            url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg",
                            fileSize: 0,
                        }],
                },
                created_at: new Date().toISOString(),
            }, {
                id: 2,
                source: 0,
                author: {
                    user_id: "test2",
                    display_name: "test2",
                    x_username: "test2",
                    profile_image_thumbnail: "",
                },
                message: "Another big quality update:\n\nWe’ve enhanced the open source scoring algorithm’s ability to spot potentially inaccurate or unsupported notes. How it works: The algorithm identifies notes that people from a wide range of viewpoints agree have potential issues with accuracy or source support. It then identifies raters who consistently and precisely spot such notes, and assigns them extra weight, enabling faster and more precise identification of notes with these issues.\n\nRaters are effectively given more weight for being diligent about vetting details of notes and following the cited sources to verify. Quick ratings that miss errors in notes, or that excessively rate notes as erroneous, lead to reduced weight. The more diligent you are as a rater, the more impact you can have.\n\nThe precision of this new approach not only results in additional helpful and informative notes being displayed on X, it also identifies more notes that people from different points of view agree have possible accuracy or source support problems.",
                rich: {
                    files: [{
                            fileName: "test.svg",
                            fileType: "image/svg+xml",
                            url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg",
                            fileSize: 0,
                        }],
                },
                created_at: new Date().toISOString(),
            }];
    }
}
//# sourceMappingURL=TestChatMessageList.js.map