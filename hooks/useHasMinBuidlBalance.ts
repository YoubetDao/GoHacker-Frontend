import { useAccount, useReadContract } from "wagmi";
import { useMemo } from "react";
import { parseUnits } from "viem";

const BUIDL_TOKEN_ADDRESS = "0x4b73c08ea7BA32593e8CA02c6910C6447E6F6642";
const BUIDL_TOKEN_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
  },
] as const;

const DECIMALS = 18;
const MIN_BALANCE = parseUnits("100000", DECIMALS);

export function useHasMinBuidlBalance() {
  const { address } = useAccount();

  const {
    data: balance,
    isSuccess,
    isLoading,
  } = useReadContract({
    address: BUIDL_TOKEN_ADDRESS,
    abi: BUIDL_TOKEN_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const hasMinBalance = useMemo(() => {
    if (!balance || !isSuccess) return false;
    try {
      // 处理 balance 可能是 bigint 或其他类型的情况
      const balanceBigInt =
        typeof balance === "bigint"
          ? balance
          : BigInt((balance as any).toString());
      return balanceBigInt >= MIN_BALANCE;
    } catch {
      return false;
    }
  }, [balance, isSuccess, address]);

  return {
    hasMinBalance,
    isLoading,
  };
}
