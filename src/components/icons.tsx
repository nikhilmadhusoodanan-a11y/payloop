
import type { SVGProps } from "react";

export function MyProductLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>PayLoop Logo</title>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)"/>
      <ellipse cx="12" cy="12" rx="7" ry="3" transform="rotate(-30 12 12)"/>
      <ellipse cx="12" cy="12" rx="4" ry="2" transform="rotate(-30 12 12)"/>
    </svg>
  );
}


export function PayLoopLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>PayLoop Logo</title>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="hsl(var(--primary))" />
      <ellipse cx="12" cy="12" rx="7" ry="3" stroke="hsl(var(--primary))" />
      <ellipse cx="12" cy="12" rx="4" ry="2" stroke="hsl(var(--primary))" />
    </svg>
  );
}

export function EthLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Ethereum</title>
      <path d="M11.944 17.97L4.58 13.62l7.364 4.35zm.112 0l7.365-4.35-7.365 4.35zM12 21.6l7.365-4.35V12.9L12 17.25v4.35zm0 0V17.25L4.635 12.9v4.35L12 21.6zm0-15.045L4.635 11.25l7.365-4.35L19.365 11.25 12 6.555zM12 5.25L4.635 9.6 12 13.95l7.365-4.35L12 5.25zM4.635 11.25v1.65l7.365 4.35v-1.65l-7.365-4.35zm14.73 0l-7.365 4.35v1.65l7.365-4.35v-1.65z" fill="currentColor"/>
    </svg>
  );
}

export function PolygonLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
        <title>Polygon</title>
        <path d="M6.352 7.031L12 3.52l5.648 3.511-2.203 6.782-3.445-2.09-3.445 2.09-2.203-6.782zM12 13.412l3.445 2.09 2.203 6.782L12 20.48l-5.648-1.805 2.203-6.782L12 13.412z"/>
    </svg>
  )
}

export function BaseLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            {...props}
        >
            <title>Base</title>
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.04 15.118v-3.79H6.333V9.122h4.627V5.53h4.07v3.59h4.63v2.206h-4.63v3.79h-4.07v-.002z"/>
        </svg>
    )
}

export function ArbitrumLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
        <title>Arbitrum</title>
        <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zM8.288 16.8h7.425L12 18.975 8.288 16.8zM12 5.025L8.288 7.2h7.425L12 5.025zM8.55 8.137v5.85l-2.925 1.763V9.9L8.55 8.137zm6.9 0L18.375 9.9v5.85l-2.925-1.763V8.137z"/>
    </svg>
  );
}

export function MetaMaskLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 256 256"
      fill="currentColor"
      {...props}>
        <title>MetaMask</title>
        <path d="M236.4,84.5,217,68.2,181.5,95.5V64.3l-28.5-21L128,64.3,103.5,43.3,75,64.3V95.5L39,68.2,19.6,84.5l49.8,45.2-17.6,30.3,27.3,27.3,34-17.6,17.6,12.9,19.9,33.7,28.2-16.4L202.1,186l17.6-12.9,34,17.6,27.3-27.3-17.6-30.3ZM128,155.6l-16.4-12.5-34,17.6L64.2,143l17.6-30.3-31.7-28.7,13.2-11.7,27.7,21.9V64.3L128,49.8l27.3,14.5V96.2l27.7-21.9,13.2,11.7-31.7,28.7,17.6,30.3-13.4,17.7-34-17.6Z"/>
    </svg>
  )
}

export function WalletConnectLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}>
            <title>WalletConnect</title>
            <path d="M17.437 5.375c-3.125-3.125-8.125-3.125-11.25 0-3.125 3.125-3.125 8.125 0 11.25l1.625-1.5c-2.5-2.5-2.5-6.5 0-9l-1.5-1.625zm-2.25 2.25c-1.25-1.25-3.25-1.25-4.5 0-1.25 1.25-1.25 3.25 0 4.5l1.5-1.5c-.75-.75-.75-1.875 0-2.625s1.875-.75 2.625 0l1.5-1.5c-.375-.375-.875-.625-1.125-.875zM19.125 3.75l-1.5 1.5c2.5 2.5 2.5 6.5 0 9l1.5 1.5c3.125-3.125 3.125-8.125 0-11.25z"/>
        </svg>
    )
}

export function CoinbaseWalletLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}>
            <title>Coinbase Wallet</title>
            <path d="M12 24C18.627 24 24 18.627 24 12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zM9 7.5a3 3 0 013-3h3a3 3 0 013 3v9a3 3 0 01-3 3h-3a3 3 0 01-3-3V7.5zm3-1.5a1.5 1.5 0 00-1.5 1.5v9a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5V7.5a1.5 1.5 0 00-1.5-1.5h-3z"/>
        </svg>
    )
}

export function OptimismLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <title>Optimism</title>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zM17.13 7.822a.501.501 0 0 0-.707 0l-4.716 4.716-2.358-2.358a.501.501 0 0 0-.707.707l2.712 2.712a.5.5 0 0 0 .707 0l5.07-5.07a.5.5 0 0 0 0-.707z" />
    </svg>
  );
}

export function AvalancheLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <title>Avalanche</title>
      <path d="M12 0L9.45 4.162h5.1L12 0zm.662 4.95l6.588 11.413-2.963.025-3.6-6.25-3.6 6.25-2.962-.025L11.338 4.95zM3.488 17.513l3.6 6.25h6.825l3.6-6.25H3.488z"/>
    </svg>
  );
}

    