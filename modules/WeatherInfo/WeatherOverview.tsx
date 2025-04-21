"use client";
import { useAppContext } from "@/context/AppContext";
import { useWeatherById } from "@/hooks/useWeatherById";
import { Text } from "@radix-ui/themes";
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

  const { weather } = useWeatherById(currentCityId);

  console.log("weather", weather);
  return (
    <div className="flex flex-col items-start gap-4 h-full">
      <div className="w-full h-[220px] relative">
        <Image
          src={getWeatherIcon(weather?.weather[0]?.main)}
          alt={weather?.weather[0]?.description}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="text-6xl">{weather?.main?.temp}°C</div>
      <Text className="text-3xl text-slate-600">{weather?.name}</Text>
      <Text>🗓️ {formatDayTime(weather?.dt)}</Text>
      <Text>🌥️ {capitalizeWords(weather?.weather[0]?.description)}</Text>
      <Text>
        {getFeelsLikeEmoji(weather?.main?.feels_like)} Feels like:{" "}
        {weather?.main?.feels_like}°C
      </Text>
    </div>
  );
};

export default WeatherOverview;
