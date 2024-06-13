import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//providers
import { ReduxProvider } from "@/lib/providers/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <ReduxProvider>{children}</ReduxProvider>
        </main>
        {/* <footer className="bg-slate-50">
          <div>
            <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
              <p className="mt-6 text-sm text-slate-500 sm:mt-0">
                Copyright &copy; {new Date().getFullYear()} OSCT. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer> */}
      </body>
    </html>
  );
}
