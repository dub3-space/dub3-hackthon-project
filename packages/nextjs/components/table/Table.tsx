import React, { useEffect } from "react";
import { useContractRead } from "wagmi";
import { ContractsAndAbis } from "~~/hooks/dub3/utils";

export const Table = () => {
  const { data, isSuccess, error } = useContractRead({
    address: ContractsAndAbis.SpeakerNFT.address,
    abi: ContractsAndAbis.SpeakerNFT.abi,
    functionName: "getAll",
  });

  console.log(isSuccess, error, ContractsAndAbis.SpeakerNFT.address);
  console.log(data);

  useEffect(() => {
    console.log(data);
  }, [data]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const parsedData: Array = data;
  if (!parsedData) {
    return <div className="p-4">Error rendering all speakers</div>;
  }
  return <div className="p-4">{parsedData.map((elem: any) => elem)}</div>;
};
