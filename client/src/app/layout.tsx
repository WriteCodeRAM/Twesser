import type { Metadata } from "next";
import { Roboto, Sora } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "Twesser",
  description:
    "Twitter trivia game where players can guess which celebrity tweeted what.",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500"],
  variable: "--font-roboto",
});

// Use Sora as a placeholder for Madimi One
const madimi = Sora({
  subsets: ["latin"],
  variable: "--font-madimi",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${madimi.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Madimi+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
