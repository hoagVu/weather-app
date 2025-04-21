import Search from "@/modules/Search/Search";
import WeatherOverview from "@/modules/WeatherInfo/WeatherOverview";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "A Weather App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <Theme
            accentColor="blue"
            grayColor="slate"
            radius="large"
            appearance="light"
          >
            <div className="lg:bg-gray-200 h-screen w-screen flex items-center justify-center p-4 lg:p-[100px]">
              <main className="grid grid-cols-12 w-full h-full bg-slate-50 lg:border lg:border-gray-100 max-w-[1240px] lg:rounded-xl">
                <div className="p-8 col-span-4 flex flex-col pr-8 gap-4">
                  <Search />
                  <WeatherOverview />
                </div>

                <div className="p-8 col-span-8 bg-slate-100 flex flex-col pl-8">
                  {children}
                </div>
              </main>
            </div>
          </Theme>
        </AppProvider>
      </body>
    </html>
  );
}
