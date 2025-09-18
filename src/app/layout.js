// app/layout.jsx

import "./globals.css"; // Your global styles
import { Inter } from "next/font/google";

import LayoutWrapper from "./LayoutWrapper";
import StoreProvider from "@/store/StoreProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Safai Index ",
  description: "Find and review public washrooms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {/* LayoutWrapper will handle the sidebar state and pass it down */}
          <LayoutWrapper>
            {children} {/* This is where your page content will be rendered */}
          </LayoutWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
