# **App Name**: PayLoop

## Core Features:

- Wallet Connection: Connect users' wallets using MetaMask, WalletConnect, or Coinbase Wallet.
- Balance Display: Display wallet balances for USDC, ETH, and DAI, with alerts for low ETH balances (used for gas).
- Bill Creation: Allow users to create bills, specifying the title, token (USDC/ETH), amount, and optional note.
- Split Configuration: Enable users to split bills evenly, by custom percentages, or by fixed amounts among participants using ENS or wallet addresses.
- Bill Sharing: Generate a shareable link and QR code for the created bill.
- Dashboard Overview: Provide a dashboard view of created and pending bills, team payouts, and recurring splits.
- Intelligent Bill Recommendation: Based on user's past history of splits and their members, recommend reasonable settings like bounty or threshold for faster split.

## Style Guidelines:

- Primary brand colors: Neon Cyan (#00FFE0) for accent buttons, links, active states. Signature glow color – bold & futuristic. Deep Navy (#0A0F1C) for backgrounds (main dashboard, cards). Reduces eye strain, makes neon pop. Slate Blue (#1C2341) for section dividers, hover states. Subtle section separation.
- Neutrals: Light Gray (#C4C4C4) for text, subtle labels. For secondary UI text, like notes or statuses. Medium Gray (#505866) for borders, input outlines. Use for dropdowns, inputs. Dark Gray (#141A29) for surface panels. Use for cards, containers. Off-White (#F2F2F2) for primary text. High readability without harsh contrast.
- Status Colors: Success Green (#22D27C) for Paid, Confirmed. For “✅ Paid” or transaction complete. Warning Yellow (#FFD15C) for low balance, pending. For balance warnings, pending splits. Error Red (#FF4D4F) for failed tx, errors. Info Blue (#5EB5F7) for tooltips, guides. Used in contextual microcopy.
- Secondary Accents (Optional for advanced interactions): Purple Neon (#C084FC) for NFT-related badges / icons. Gradient Overlay: linear-gradient(90deg, #00FFE0 0%, #5EB5F7 100%) for Hover glows / transitions.
- Body font: 'Inter', a sans-serif font for clean readability and modern feel.
- Headline font: 'Space Grotesk', for short and bold displays.
- Use clean, minimalist icons to represent different tokens, actions, and statuses. Consider using filled icons for primary actions and outline icons for secondary actions.
- Maintain a clean and intuitive layout, using clear visual hierarchy to guide users through the bill splitting process. Prioritize key information such as balances, amounts owed, and status updates.