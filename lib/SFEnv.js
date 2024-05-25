class SFEnv {
    dev;
    serviceName;
    serviceUrl;
    overviewUrl;
    socialUrls;
    messageForWalletLinking;
    chains;
    defaultChain;
    contractAddresses;
    assetName;
    userBaseUri;
    creatorOptions;
    hashtagOptions;
    postOptions;
    additionalFeatures;
    get followEnabled() {
        return this.additionalFeatures?.includes("follow");
    }
    init(options) {
        this.dev = options.dev;
        this.serviceName = options.serviceName;
        this.serviceUrl = options.serviceUrl;
        this.overviewUrl = options.overviewUrl;
        this.socialUrls = options.socialUrls;
        this.messageForWalletLinking = options.messageForWalletLinking;
        this.chains = options.chains;
        this.defaultChain = options.defaultChain;
        this.contractAddresses = options.contractAddresses;
        this.assetName = options.assetName;
        this.userBaseUri = options.userBaseUri;
        this.creatorOptions = options.creatorOptions;
        this.hashtagOptions = options.hashtagOptions;
        this.postOptions = options.postOptions;
        this.additionalFeatures = options.additionalFeatures;
    }
}
export default new SFEnv();
//# sourceMappingURL=SFEnv.js.map