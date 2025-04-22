// src/context/AppContext.tsx
"use client";

import { AddressInfo } from "@/utils/@types/weather";
import { DEFAULT_CITY_ID, DEFAULT_WIDGET } from "@/utils/constant";
import { createContext, useContext, useState } from "react";

type AppContextType = {
  currentCityId: number;
  setCurrentCityId: (val: number) => void;
  widgets: AddressInfo[];
  setWidgets: React.Dispatch<React.SetStateAction<AddressInfo[]>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentCityId, setCurrentCityId] = useState(DEFAULT_CITY_ID);
  const [widgets, setWidgets] = useState<AddressInfo[]>(DEFAULT_WIDGET);

  return (
    <AppContext.Provider
      value={{ currentCityId, setCurrentCityId, widgets, setWidgets }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
}
