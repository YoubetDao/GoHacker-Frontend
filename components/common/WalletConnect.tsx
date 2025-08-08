"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet } from "lucide-react";
import { Button } from "../ui/button";
import { logEvent } from "@/lib/gtag";
import { useRef } from "react";

export default function WalletConnect() {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // 用于跟踪连接状态，避免重复上报
  const previousConnectedRef = useRef<boolean>(false);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        // 监听连接状态变化并上报GA事件
        if (connected && !previousConnectedRef.current) {
          // 钱包连接成功
          logEvent('wallet_connect', 'User');
          previousConnectedRef.current = true;
        } else if (!connected && previousConnectedRef.current) {
          // 钱包断开连接
          logEvent('wallet_disconnect', 'User');
          previousConnectedRef.current = false;
        }

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    className="font-medium rounded-full flex items-center gap-2"
                  >
                    <Wallet size={16} />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    className="font-medium rounded-full bg-red-600 hover:bg-red-700"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <Button
                  onClick={openAccountModal}
                  className="font-medium rounded-full flex items-center gap-2"
                >
                  <Wallet size={16} />
                  {formatAddress(account.address)}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
