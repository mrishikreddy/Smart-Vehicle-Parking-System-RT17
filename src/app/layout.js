// layout.js

import "./globals.css";
import { Inter } from "next/font/google"; // or another font

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Smart Vehicle Parking System",
  description: "This project is made for project Expo 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
