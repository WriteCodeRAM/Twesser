import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Twesser",
  description:
    "Twitter trivia game where players can guess which celebrity tweeted what.",
};

const roboto_init = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        href="https://fonts.googleapis.com/css2?family=Madimi+One&display=swap"
        rel="stylesheet"
        precedence="default"
      />

      <body className={roboto_init.variable}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
