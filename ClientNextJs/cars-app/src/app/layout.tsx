import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";


export const metadata: Metadata = {
  title: "Каталог автомобилей",
  description: "Каталог автомобилей на next,js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" prefix="og: http://ogp.me/ns#">
      <head>
        <link href='https://fonts.googleapis.com/css?family=Open Sans' rel='stylesheet' />
        <meta name="Keywords" content="Каталог автомобилей" />
        <meta property="og:site_name" content="auto-catalog.by" />
        <meta property="og:type" content="Website" />
        <meta property="og:locale" content="ru_RU" />
        <meta name="ROBOTS" content="all" />
      </head>
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
