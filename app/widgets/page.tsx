"use client";

import { useAppContext } from "@/context/AppContext";
import { useGetListWeather } from "@/hooks/useGetListWeather";
import WidgetCard from "@/modules/WidgetCard/WidgetCard";
import WidgetCardSkeleton from "@/modules/WidgetCard/WidgetCardSkeleton";
import { Key } from "react";

export default function WidgetPage() {
  const { weather, isLoading } = useGetListWeather([1581130, 1566083, 1581298]);

  const { setCurrentCityId } = useAppContext();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from(Array(3).keys()).map((_, index) => {
          return <WidgetCardSkeleton key={index} />;
        })}
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {(weather?.list).map(
        (
          elm: {
            name: string;
            main: { temp: string | number; humidity: string | number };
            wind: { speed: string | number };
            weather: {
              description: string;
              icon: string;
            }[];
            id: number;
          },
          index: Key | null | undefined
        ) => {
          return (
            <div
              key={index}
              onClick={() => {
                setCurrentCityId(elm?.id);
              }}
            >
              <WidgetCard
                location={elm?.name}
                temp={elm?.main?.temp}
                humidity={elm?.main?.humidity}
                windSpeed={elm?.wind?.speed}
                description={elm?.weather[0]?.description}
                icon={elm?.weather[0]?.icon}
                id={elm?.id}
                loading={!weather}
              ></WidgetCard>
            </div>
          );
        }
      )}
    </div>
  );
}
