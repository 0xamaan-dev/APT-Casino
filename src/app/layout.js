import "@/styles/globals.css";
import "@/styles/fonts.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar.js";
import Footer from "@/components/Footer";
import GlobalWalletManager from "@/components/GlobalWalletManager";

export const metadata = {
  title: "APT Casino",
  description: "APT Casino",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className="overflow-x-hidden w-full"
        suppressHydrationWarning={true}
      >
        <Providers>
          <GlobalWalletManager />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
