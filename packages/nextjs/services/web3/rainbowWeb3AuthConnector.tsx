import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OPENLOGIN_NETWORK, OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Chain } from "viem";
import * as wagmiChains from "wagmi/chains";

const name = "Login with Google";
const iconUrl =
  "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png";

type ChainConfig = {
  chainNamespace: string | any;
  chainId: string;
  rpcTarget: string;
  displayName: string;
  blockExplorer: string;
  ticker: string;
  tickerName: string;
};

export const rainbowWeb3AuthConnector = ({ chains }: { chains: Chain[] }) => {
  // Create Web3Auth Instance

  const CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;
  const chainConfig: ChainConfig = {
    chainNamespace: "eip155",
    chainId: "0x13881",
    rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: "Polygon Mumbai",
    blockExplorer: "https://mumbai.polygonscan.com/",
    ticker: "MATIC",
    tickerName: "MATIC",
  };

  const web3AuthInstance = new Web3AuthNoModal({
    clientId: CLIENT_ID as string,
    chainConfig: chainConfig as ChainConfig,
    web3AuthNetwork: OPENLOGIN_NETWORK.SAPPHIRE_DEVNET,
  });

  // Add openlogin adapter for customisations
  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
  const openloginAdapterInstance = new OpenloginAdapter({
    privateKeyProvider,
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  const connector = new Web3AuthConnector({
    chains,
    options: {
      web3AuthInstance,
      loginParams: {
        loginProvider: "google",
      },
      modalConfig: {
        chains: [wagmiChains.polygonMumbai, wagmiChains.sepolia],
      },
    },
  });

  return {
    id: "web3auth",
    name,
    iconUrl,
    iconBackground: "#fff",
    createConnector: () => {
      return {
        connector,
      };
    },
  };
};
