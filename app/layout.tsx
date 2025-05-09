import Search from "@/modules/Search/Search";
import WeatherOverview from "@/modules/WeatherInfo/WeatherOverview";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "swiper/css";
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
            <div className="scroll-x-lg lg:bg-gray-200 h-dvh w-dvw flex items-center justify-center p-0 lg:p-[40px] lg:max-h-[calc(100%-80px)]">
              <div className="flex flex-col lg:grid lg:grid-cols-12 w-full h-full bg-slate-50 lg:border lg:border-gray-100 max-w-[1240px] lg:rounded-xl">
                <div className="w-full p-4 lg:p-6 col-span-4 flex flex-col pb-6 lg:pr-6 gap-4">
                  <Search />
                  <WeatherOverview />
                </div>

                <div className="p-4 lg:p-6 col-span-8 bg-slate-100 flex flex-col pb-[30px] lg:pl-6 h-full lg:rounded-xl">
                  {children}
                </div>
              </div>
            </div>
          </Theme>
        </AppProvider>
      </body>
    </html>
  );
}
