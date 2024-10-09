import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GA } from "../../components/GA/GA";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jack Loizel",
  description: "My online portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>

      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1"/>
      <meta name="description" content="Welcome to my online portfolio"/>
      <meta name="author" content="Jack Loizel"/>
      <meta charSet="UTF-8"/>

      <body className={inter.className}>{children}</body>

      <GA/>
      
    </html>
  );
}
