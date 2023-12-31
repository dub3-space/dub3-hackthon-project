import { ConnectButton } from "@rainbow-me/rainbowkit";
import { QRCodeSVG } from "qrcode.react";
import { useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import * as chains from "wagmi/chains";
import {
  ArrowLeftOnRectangleIcon,
  ArrowsRightLeftIcon,
  ChevronDownIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { Address, Balance, BlockieAvatar } from "~~/components/scaffold-eth";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  const networkColor = useNetworkColor();
  const configuredNetwork = getTargetNetwork();
  const { disconnect } = useDisconnect();
  const { chain: connectedChain } = useNetwork();

  const { switchNetwork } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    chainId: configuredNetwork.id === chains.polygonMumbai.id ? chains.sepolia.id : chains.polygonMumbai.id,
  });
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button className="btn btn-primary btn-sm" onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              return (
                <div className="px-2 flex justify-end items-center">
                  <div className="flex flex-col items-center mr-1">
                    <Balance address={account.address} className="min-h-0 h-auto" />
                    <span className="text-xs" style={{ color: networkColor }}>
                      {connectedChain?.name}
                    </span>
                  </div>
                  <div className="dropdown dropdown-end leading-3">
                    <label
                      tabIndex={0}
                      className="btn btn-secondary btn-sm pl-0 pr-2 shadow-md dropdown-toggle gap-0 !h-auto"
                    >
                      <BlockieAvatar address={account.address} size={30} ensImage={account.ensAvatar} />
                      <span className="ml-2 mr-1">{account.displayName}</span>
                      <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu z-[2] p-2 mt-2 shadow-center shadow-accent bg-base-200 rounded-box gap-1"
                    >
                      <li>
                        <label htmlFor="qrcode-modal" className="btn-sm !rounded-xl flex gap-3 py-3">
                          <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
                          <span className="whitespace-nowrap">View QR Code</span>
                        </label>
                      </li>
                      <li>
                        <button
                          className="btn-sm !rounded-xl flex py-3 gap-3"
                          type="button"
                          onClick={() =>
                            chain.id === chains.polygonMumbai.id
                              ? switchNetwork?.(chains.sepolia.id)
                              : switchNetwork?.(chains.polygonMumbai.id)
                          }
                        >
                          <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
                          <span className="whitespace-nowrap">
                            Switch to{" "}
                            <span style={{ color: networkColor }}>
                              {connectedChain?.id === chains.polygonMumbai.id
                                ? chains.sepolia.name
                                : chains.polygonMumbai.name}
                            </span>
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
                          type="button"
                          onClick={() => disconnect()}
                        >
                          <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <input type="checkbox" id="qrcode-modal" className="modal-toggle" />
                    <label htmlFor="qrcode-modal" className="modal cursor-pointer">
                      <label className="modal-box relative">
                        {/* dummy input to capture event onclick on modal box */}
                        <input className="h-0 w-0 absolute top-0 left-0" />
                        <label
                          htmlFor="qrcode-modal"
                          className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
                        >
                          ✕
                        </label>
                        <div className="space-y-3 py-6">
                          <div className="flex space-x-4 flex-col items-center gap-6">
                            <QRCodeSVG value={account.address} size={256} />
                            <Address address={account.address} format="long" disableAddressLink />
                          </div>
                        </div>
                      </label>
                    </label>
                  </div>
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
