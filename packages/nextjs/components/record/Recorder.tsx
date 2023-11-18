import React, { useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import { LoaderIcon } from "react-hot-toast";

export const Recorder = () => {
  const [file, setFile] = useState<FileList | null>();
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>();
  const [fileUploaded, setFileUploaded] = useState<boolean>();
  const [price, setPrice] = useState("");
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
    setIsUploadLoading(false);
    setFileUploaded(true);
    alert(`File uploaded at ${"https://gateway.lighthouse.storage/ipfs/"}`);
  };

  return (
    <div className="p-4">
      {fileUploaded || true ? ( //TODO remove, jsut for developmnenrt
        <>
          <div className="flex flex-col items-center justify-center max-w-sm text-black">
            <input
              type="number"
              placeholder={`Enter Price (USDC)`}
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="mt-4 p-2 border border-gray-300 rounded"
            />
            <button onClick={() => alert("CAZZO")} className="mt-2 bg-blue-500 text-white p-2 rounded">
              Submit
            </button>
          </div>
        </>
      ) : (
        <>
          <input onChange={e => setFile(e.target.files)} type="file" className="mt-4" />
          {isUploadLoading ? (
            <div className="flex items-center justify-center">
              <LoaderIcon />
            </div>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={() => uploadFile(file)}>
              Upload
            </button>
          )}
        </>
      )}
    </div>
  );
};
