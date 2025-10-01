import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Crochet Cost",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased bg-gradient-to-br from-rose-100 via-pink-100 to-amber-100 flex flex-col h-dvh justify-between`}
      >
        {children}

        <Footer />
      </body>
    </html>
  );
}
