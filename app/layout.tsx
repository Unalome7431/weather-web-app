import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Mulish } from "next/font/google";
import "./globals.css";
import Providers from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap"
})

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap"
})

export const metadata: Metadata = {
  title: "WeaPredict",
  description: "Weather web app to display weather information of certain location",
  icons: {
    icon: '/weather-app-icon/partly-cloudy-day.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${mulish.variable} font-mulish`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
