import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });

export const metadata: Metadata = {
  title: { default: "Bondhon | Community service events", template: "%s | Bondhon" },
  description: "Find, host and join neighbourhood service events across Bangladesh.",
};

// Sets the saved theme before first paint so there is no light/dark flash
const themeScript = `try{var t=localStorage.getItem("theme");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"bondhon-dark":"bondhon"}document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="bondhon" className={bricolage.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "var(--color-base-100)",
              color: "var(--color-base-content)",
              border: "1px solid var(--color-base-300)",
            },
          }}
        />
      </body>
    </html>
  );
}
