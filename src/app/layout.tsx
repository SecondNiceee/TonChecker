'use client'
import "./globals.css";
import {TonConnectUIProvider} from "@tonconnect/ui-react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
        <head>
          <title>TON Connect Demo</title>
        </head>
        <TonConnectUIProvider manifestUrl="https://gray-adequate-kiwi-828.mypinata.cloud/ipfs/bafkreibzywoou4ukocyeme4qela4u7ce2pefydk7yv3nzgddkawrvwdvzy">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
