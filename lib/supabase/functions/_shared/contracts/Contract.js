import { ethers, } from "https://esm.sh/ethers@6.7.0";
export default class Contract {
    ethersContract;
    constructor(address, abi, signer) {
        this.ethersContract = new ethers.Contract(address, abi, signer);
    }
}
//# sourceMappingURL=Contract.js.map