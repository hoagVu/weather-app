"use client";
import { useAppContext } from "@/context/AppContext";
import { useWeatherById } from "@/hooks/useWeatherById";
import { Skeleton, Text } from "@radix-ui/themes";
import Image from "next/image";
import * as React from "react";
import { getWeatherIcon } from "./utils";
import {
  capitalizeWords,
  formatDayTime,
  getFeelsLikeEmoji,
} from "@/utils/helper";

type IWeatherOverviewProps = object;

const WeatherOverview: React.FunctionComponent<IWeatherOverviewProps> = () => {
  const { currentCityId } = useAppContext();

  const { weather, isLoading } = useWeatherById(currentCityId);

  return (
    <div className="flex flex-col justify-start item-center gap-4 h-full">
      <Skeleton loading={isLoading}>
        <div className="lg:w-full lg:h-[220px] relative">
          <Image
            src={getWeatherIcon(weather?.weather?.[0]?.main)}
            alt={weather?.weather?.[0]?.description || ""}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <div className="text-6xl text-center ">{weather?.main?.temp}°C</div>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <div className="text-4xl text-slate-600 text-center ">
          {weather?.name}
        </div>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <div className="text-center ">🗓️ {formatDayTime(weather?.dt)}</div>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <div className="text-center ">
          🌥️ {capitalizeWords(weather?.weather?.[0]?.description)}
        </div>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <div className="text-center ">
          {getFeelsLikeEmoji(weather?.main?.feels_like)} Feels like:&nbsp;
          {weather?.main?.feels_like}°C
        </div>
      </Skeleton>
    </div>
  );
};

export default WeatherOverview;
