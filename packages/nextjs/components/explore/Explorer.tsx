/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
// import { inputBoxAbi } from "./resources";
import { ethers } from "ethers";
// import { useContractWrite } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";

const inputBoxAbi = [
  {
    inputs: [],
    name: "InputSizeExceedsLimit",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "dapp",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "inputIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "input",
        type: "bytes",
      },
    ],
    name: "InputAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dapp",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_input",
        type: "bytes",
      },
    ],
    name: "addInput",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dapp",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getInputHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dapp",
        type: "address",
      },
    ],
    name: "getNumberOfInputs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const Explorer = () => {
  const [input, setInput] = useState<string>();
  const [provider, setProvider] = useState<ethers.JsonRpcProvider>();
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
  const [InputContract, setContract] = useState<ethers.Contract>();

  useEffect(() => {
    // Connect to an Ethereum node
    const connectToProvider = async () => {
      const newProvider = new ethers.JsonRpcProvider("https://f71a-212-175-155-170.ngrok-free.app");
      setProvider(newProvider);

      const newSigner = await newProvider.getSigner();
      setSigner(newSigner);

      // Replace 'CONTRACT_ADDRESS' and add the actual ABI of your smart contract
      const contractAddress = "0x59b22D57D4f067708AB0c00552767405926dc768";
      const contractABI = inputBoxAbi;
      const newContract = new ethers.Contract(contractAddress, contractABI, newSigner);
      setContract(newContract);
    };

    connectToProvider();
  }, []);

  // const INPUT = '{\n  "sample": "https://gateway.lighthouse.storage/ipfs/QmcRXYN3kNHYyxkJHYEvd84twchVyc8N2oNa4j7vMwR1om",\n  "speech": "Unlock new possibilities with cutting-edge technology. Experience innovation at your fingertips. Embrace the future today."\n}'
  // const { data, isSuccess } = useContractWrite({
  //   address: "0x59b22D57D4f067708AB0c00552767405926dc768", //inputBoxAddress
  //   abi: inputBoxAbi,
  //   functionName: "addInput",
  // });

  const parseInputAndSendTx = async () => {
    try {
      console.log(inputBoxAbi);
      const mrinoDapp = "0x70ac08179605af2d9e75782b8decdd3c22aa4d0c";
      const payload = ethers.toUtf8Bytes(input as string);
      const tx = await InputContract?.addInput(mrinoDapp, payload);
      console.log("string to send", "hello!");
      console.log(tx);

      notification.success(`Transaction completed successfully!`, {
        icon: "🎉",
      });
    } catch (e) {
      console.log(`${e}`);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center max-w-sm text-black">
        {/* <textarea
          placeholder={`Enter Your Script`}
          value={1}
          onChange={e => setPrice(e.target.value)}
          className="mt-4 p-2 border border-gray-300 rounded"
        /> */}
        <p>Mock Call To Cartesi VM!</p>
        <div>
          Send Input <br />
          Input:{" "}
          <textarea
            // type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button onClick={() => parseInputAndSendTx()} className="mt-2 bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
