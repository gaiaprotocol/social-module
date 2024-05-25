import ChainInfo from "./ChainInfo.js";
type AdditionalFeature = "follow";
declare class SFEnv {
    dev: boolean;
    serviceName: string;
    serviceUrl: string;
    overviewUrl: string;
    socialUrls: {
        [key: string]: string;
    };
    messageForWalletLinking: string;
    chains: {
        [chainName: string]: ChainInfo;
    };
    defaultChain: string;
    contractAddresses: {
        [chainName: string]: {
            [contractType: number]: string;
        };
    };
    assetName: string;
    userBaseUri: string | undefined;
    creatorOptions: {
        unit: string;
        baseUri: string;
    } | undefined;
    hashtagOptions: {
        unit: string;
        baseUri: string;
    } | undefined;
    postOptions: {
        baseUri: string;
    } | undefined;
    additionalFeatures: AdditionalFeature[] | undefined;
    get followEnabled(): boolean | undefined;
    init(options: {
        dev: boolean;
        serviceName: string;
        serviceUrl: string;
        overviewUrl: string;
        socialUrls: {
            [key: string]: string;
        };
        messageForWalletLinking: string;
        chains: {
            [chainName: string]: ChainInfo;
        };
        defaultChain: string;
        contractAddresses: {
            [chainName: string]: {
                [contractType: number]: string;
            };
        };
        assetName: string;
        userBaseUri?: string;
        creatorOptions?: {
            unit: string;
            baseUri: string;
        };
        hashtagOptions?: {
            unit: string;
            baseUri: string;
        };
        postOptions?: {
            baseUri: string;
        };
        additionalFeatures?: AdditionalFeature[];
    }): void;
}
declare const _default: SFEnv;
export default _default;
//# sourceMappingURL=SFEnv.d.ts.map