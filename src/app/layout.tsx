import "./globals.css"

import type { Metadata } from "next"
import { Roboto } from "next/font/google"

export const metadata: Metadata = {
  title: "Gerenciador de Aplicações",
};

const roboto = Roboto({
  weight: ["500", "600", "800"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${roboto.variable}`}>
      <body className="bg-gray-900 text-gray-100 antialiased bg-[url(/background.png)] bg-no-repeat md:bg-right-top bg-top">
        {children}
      </body>
    </html>
  );
}
