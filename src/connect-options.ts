/**
 * Default options for @stacks/connect; use with requestDeposit and connect().
 */
import type { ConnectOptions } from "./connect-wallet.js";

export const defaultAppDetails: ConnectOptions["appDetails"] = {
  name: "stackdapp",
};

export function getConnectOptions(
  contractAddress: string,
  network: "mainnet" | "testnet"
): Pick<ConnectOptions, "contractAddress" | "network" | "appDetails"> {
  return {
    contractAddress,
    network,
    appDetails: defaultAppDetails,
  };
}
