import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Provider from "@/components/Provider/Provider";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dialogify | Home",
  description: "Generated by create next app",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-[#F0F2F5]">
          <Provider>
            <Toaster />
            <div className='shadow-md bg-white sticky top-0 z-50'>
              <Navbar />
            </div>
            {children}
          </Provider>
        </div>
      </body>
    </html>
  );
}
