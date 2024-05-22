import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from '@/app/ui/home.module.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clinic Flow",
  description: "A Clinic Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}        
      </body>
    </html>
  );
}
