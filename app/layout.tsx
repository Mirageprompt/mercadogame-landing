import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mercadogame.com.br"),
  title: "MercadoGame — O Marketplace Gamer do Brasil",
  description:
    "Compre, venda e troque itens de jogos com segurança. PIX com escrow, verificação KYC, sistema de gamificação e reputação verificada. O marketplace feito para gamers brasileiros.",
  keywords: [
    "marketplace gamer",
    "comprar itens jogos",
    "vender itens jogos",
    "Free Fire",
    "CS2",
    "Valorant",
    "escrow PIX",
    "gamificação",
    "Brasil",
  ],
  authors: [{ name: "MercadoGame" }],
  openGraph: {
    title: "MercadoGame — O Marketplace Gamer do Brasil",
    description:
      "Compre, venda e troque itens de jogos com segurança. PIX com escrow e sistema de gamificação.",
    url: "https://mercadogame.com.br",
    siteName: "MercadoGame",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MercadoGame - Marketplace Gamer",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MercadoGame — O Marketplace Gamer do Brasil",
    description:
      "Compre, venda e troque itens de jogos com segurança. PIX com escrow e gamificação.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-[#08080F] text-[#E2E8F0] antialiased"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
