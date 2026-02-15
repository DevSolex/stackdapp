/**
 * Network helper for @stacks/connect and @stacks/transactions.
 */
export type Network = "mainnet" | "testnet";

export function isMainnet(network: string): network is "mainnet" {
  return network === "mainnet";
}

export function getNetwork(env?: string): Network {
  return env === "mainnet" ? "mainnet" : "testnet";
}
