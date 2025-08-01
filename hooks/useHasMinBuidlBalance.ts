import { useAccount, useReadContract } from "wagmi";
import { useMemo } from "react";
import { parseUnits } from "viem";

// 质押合约地址
const STAKE_CONTRACT_ADDRESS = "0x9e62A2d69C78777D83A4344177416F5fA05E9Fff";
const STAKE_CONTRACT_ABI = [
  {
    name: "stakedAmountOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "amount", type: "uint256" }],
  },
] as const;

// BUIDL 代币合约地址
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
const MIN_STAKE_AMOUNT = parseUnits("50000", DECIMALS);  // 质押50k
const MIN_TOKEN_BALANCE = parseUnits("100000", DECIMALS); // 持有100k

export function useHasMinBuidlBalance() {
  const { address } = useAccount();

  // 查询质押金额
  const {
    data: stakedAmount,
    isSuccess: isStakeSuccess,
    isLoading: isStakeLoading,
  } = useReadContract({
    address: STAKE_CONTRACT_ADDRESS,
    abi: STAKE_CONTRACT_ABI,
    functionName: "stakedAmountOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // 查询代币余额
  const {
    data: tokenBalance,
    isSuccess: isBalanceSuccess,
    isLoading: isBalanceLoading,
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
    let hasMinStake = false;
    let hasMinTokens = false;

    // 检查质押金额
    if (stakedAmount && isStakeSuccess) {
      try {
        const stakedAmountBigInt =
          typeof stakedAmount === "bigint"
            ? stakedAmount
            : BigInt(String(stakedAmount));
        hasMinStake = stakedAmountBigInt >= MIN_STAKE_AMOUNT;
      } catch {
        hasMinStake = false;
      }
    }

    // 检查代币余额
    if (tokenBalance && isBalanceSuccess) {
      try {
        const tokenBalanceBigInt =
          typeof tokenBalance === "bigint"
            ? tokenBalance
            : BigInt(String(tokenBalance));
        hasMinTokens = tokenBalanceBigInt >= MIN_TOKEN_BALANCE;
      } catch {
        hasMinTokens = false;
      }
    }

    // 质押50k或持有100k任一条件满足即可
    return hasMinStake || hasMinTokens;
  }, [stakedAmount, isStakeSuccess, tokenBalance, isBalanceSuccess]);

  return {
    hasMinBalance,
    isLoading: isStakeLoading || isBalanceLoading,
  };
}
