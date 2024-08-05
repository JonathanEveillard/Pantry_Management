import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry Manager",
  description: "Create and manage your pantry",
};

export default function RootLayout({ children }) {
  return (

      <html lang="en">
        <link rel="icon" href="/" sizes="any" />
        <body className={inter.className}>{children}</body>
      </html>

  );

}
