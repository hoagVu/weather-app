"use client";
import { useAppContext } from "@/context/AppContext";
import { TabGroup } from "./TabGroup";

export const NavGroup = () => {
  const { currentCityId } = useAppContext();

  return (
    <TabGroup
      path="/widgets"
      items={[
        {
          text: "Widgets",
        },
        {
          text: "Widget Detail",
          slug: currentCityId.toString(),
        },
      ]}
    />
  );
};
