import { abi as buyerAbi } from "./BuyerNFTABI";
import { abi as speakerAbi } from "./SpeakerNFTAbi";
import { abi as destinationMinterABI } from "./destinationMinterABI";
import { abi as sourceMinterAbi } from "./sourceMinterABI";

export const ContractsAndAbis = {
  SpeakerNFT: {
    address: "0xB31B82CDF32ce766E7acB943565347383Ac9ec26",
    abi: speakerAbi,
  },
  BuyerNFT: {
    address: "0x59087174Dd6F511C73e62618DaeE710F2db0819F",
    abi: buyerAbi,
  },
  SourceMinter: {
    address: "0x7e28Bca799F90AB6e8264E93B123cE9990987567",
    abi: sourceMinterAbi,
  },
  DestinationMinter: {
    address: "0xF0228036FC21aD442250d4c887F492c50b5A3A37",
    abi: destinationMinterABI,
  },
};

export type UseMintSpeakerNFT = {
  contractName: "SpeakerNFT";
  functionName?: string;
  args?: any[];
};

export enum SpeakerNFTMethods {
  MINT = "mint",
  MINT_CROSSCHAIN = "mint",
}
