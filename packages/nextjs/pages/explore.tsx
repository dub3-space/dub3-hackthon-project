import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useContractRead } from "wagmi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import Table from "~~/components/explore/Table";
import { ContractsAndAbis } from "~~/hooks/dub3/utils";

const ExplorerPage: NextPage = () => {
  const [data, setData] = useState<any[]>();
  const {
    data: readData,
    // isSuccess,
    // error,
  } = useContractRead({
    address: ContractsAndAbis.SpeakerNFT.address,
    abi: ContractsAndAbis.SpeakerNFT.abi,
    functionName: "getAll",
  });

  useEffect(() => {
    console.log("readData", readData);
    setData(readData as any[]);
  }, [readData]);

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Dub3.ai</span>
          </h1>
        </div>

        <div className="flex-grow bg-base-300 w-full">
          <div className="flex justify-center items-center">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>Explore Speakers</p>
              <Table data={data as any[]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExplorerPage;
