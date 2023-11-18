import React, { useEffect, useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import { polygonMumbai } from "@wagmi/core/chains";
import { LoaderIcon } from "react-hot-toast";
import { useAccount, useContractWrite, useNetwork } from "wagmi";
import { ContractsAndAbis } from "~~/hooks/dub3/utils";
import { notification } from "~~/utils/scaffold-eth";

export const Recorder = () => {
  const [file, setFile] = useState<FileList | null>();
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>();
  const [fileUploaded, setFileUploaded] = useState<boolean>();
  const [price, setPrice] = useState("");
  const [cid, setCid] = useState("");
  const { address: to, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const destinationChainSelector = "12532609583862916517";
  const receiver = "0xF0228036FC21aD442250d4c887F492c50b5A3A37";
  const payFeesIn = 1;
  const SAMPLE_TEXT =
    "Unlock new possibilities with cutting-edge technology. Experience innovation at your fingertips. Embrace the future today.";
  console.log(chain);
  const { data, isSuccess, write } = useContractWrite({
    address:
      chain?.id == polygonMumbai.id ? ContractsAndAbis.SpeakerNFT.address : ContractsAndAbis.SourceMinter.address,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    abi: chain?.id == polygonMumbai.id ? ContractsAndAbis.SpeakerNFT.abi : ContractsAndAbis.SourceMinter.abi,
    functionName: "mint",
  });

  useEffect(() => {
    if (isSuccess) {
      notification.success(`Transaction with hash ${data?.hash} completed successfully!`, {
        icon: "🎉",
      });
    }
  }, [data?.hash, isSuccess]);

  const progressCallback = (progressData: { total: number; uploaded: number }) => {
    const percentageDone = 100 - Number(progressData?.total / progressData?.uploaded);
    console.log(percentageDone);
  };

  const uploadFile = async (file: FileList | null | undefined) => {
    setIsUploadLoading(true);
    if (!file) {
      alert("upload file first");
      return;
    }
    const output = await lighthouse.upload(
      file,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY as string,
      false,
      undefined,
      progressCallback,
    );
    console.log("File Status:", output);

    console.log("Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
    setCid(output.data.Hash);
    setIsUploadLoading(false);
    setFileUploaded(true);
    alert(`File uploaded at ${"https://gateway.lighthouse.storage/ipfs/"}`);
  };

  const handleMint = async () => {
    if (isDisconnected) {
      alert("connect wallet first");
      return;
    }
    console.log(ContractsAndAbis.SpeakerNFT.abi);
    write({
      args:
        chain?.id == polygonMumbai.id
          ? [to, cid, SAMPLE_TEXT, 0]
          : [destinationChainSelector, receiver, payFeesIn, cid, SAMPLE_TEXT, 0], // to, cid,audioscript,audioprice
    });
  };
  return (
    <div className="p-4">
      {fileUploaded ? ( //TODO remove, jsut for developmnenrt
        <>
          <div className="flex flex-col items-center justify-center max-w-sm text-black">
            <input
              type="number"
              placeholder={`Enter Price (USDC)`}
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="mt-4 p-2 border border-gray-300 rounded"
            />
            <button onClick={() => handleMint()} className="mt-2 bg-blue-500 text-white p-2 rounded">
              Submit
            </button>
          </div>
        </>
      ) : (
        <>
          {isUploadLoading ? (
            <div className="flex items-center justify-center">
              <LoaderIcon />
            </div>
          ) : (
            <>
              <div className="text-green-500 font-bold">Read this sentence and upload the audio:</div>
              <div className="text-red-500 font-bold">
                Unlock new possibilities with cutting-edge technology. Experience innovation at your fingertips. Embrace
                the future today.
              </div>
              <input onChange={e => setFile(e.target.files)} type="file" className="mt-4" />
              <button className="btn btn-secondary btn-sm" onClick={() => uploadFile(file)}>
                Upload
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};
