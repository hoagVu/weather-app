"use client";

import { useAppContext } from "@/context/AppContext";
import { useGetListWeather } from "@/hooks/useGetListWeather";
import WidgetCard from "@/modules/WidgetCard/WidgetCard";
import WidgetCardSkeleton from "@/modules/WidgetCard/WidgetCardSkeleton";

export default function WidgetPage() {
  const { setCurrentCityId, currentCityId, widgets } = useAppContext();
  const { weather, isLoading } = useGetListWeather(
    widgets.map((elm) => elm.id)
  );

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
      {weather?.list?.map(
        (elm: {
          name: string;
          main: { temp: string | number; humidity: string | number };
          wind: { speed: string | number };
          weather: {
            main: string;
            description: string;
            icon: string;
          }[];
          id: number;
        }) => {
          const isActive = elm?.id === currentCityId;
          return (
            <div
              key={elm?.id}
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
                main={elm?.weather[0]?.main}
                id={elm?.id}
                loading={!weather}
                isActive={isActive}
                canRemove={weather?.list?.length > 1}
              ></WidgetCard>
            </div>
          );
        }
      )}
    </div>
  );
}
