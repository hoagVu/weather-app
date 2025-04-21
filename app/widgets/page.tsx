"use client";

import WidgetCard from "@/modules/WidgetCard/WidgetCard";
import WidgetCardSkeleton from "@/modules/WidgetCard/WidgetCardSkeleton";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export default function WidgetPage() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/group?id=1581130,1566083,1581298&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      setWeather(data);
    };

    fetchWeather();
  }, []);

  console.log("weather", weather);

  if (!weather)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from(Array(3).keys()).map((_, index) => {
          return <WidgetCardSkeleton key={index} />;
        })}
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {(weather?.list).map((elm, index) => {
        return (
          <div key={index}>
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
      })}
    </div>
  );
}
