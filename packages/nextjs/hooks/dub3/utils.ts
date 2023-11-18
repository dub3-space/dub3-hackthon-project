import { abi } from "./SpeakerNFTAbi";

export const ContractsAndAbis = {
  SpeakerNFT: {
    address: "0xB31B82CDF32ce766E7acB943565347383Ac9ec26",
    abi: abi,
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
