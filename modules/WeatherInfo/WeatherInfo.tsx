"use client";
import { Heading, Skeleton } from "@radix-ui/themes";
import Image from "next/image";
import * as React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { getWeatherIcon } from "./utils";

import "swiper/css/navigation";
import WeatherDashboard from "./WeatherDashboard";
import { useWeatherById } from "@/hooks/useWeatherById";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";

interface IWeatherInfoProps {
  id: string;
}

const WeatherInfo: React.FunctionComponent<IWeatherInfoProps> = ({ id }) => {
  const { weather, isLoading } = useWeatherById(id);
  const { forecast, isLoading: isLoadingForecast } = useWeatherForecast(id);

  const dailyForecasts = forecast?.list?.filter((item: any) =>
    item.dt_txt.includes("12:00:00")
  );
  const dailyForecastsNext24h = forecast?.list?.slice(0, 8); // 24h tới

  return (
    <div className="flex flex-col gap-4">
      {isLoadingForecast ? (
        <>
          <div className="flex gap-4">
            {Array.from(Array(5).keys()).map((_, index) => {
              return (
                <div
                  key={index}
                  className="p-3 !w-[120px] flex flex-col justify-center items-center gap-2 h-full bg-white shadow rounded-lg cursor-pointer"
                >
                  <Skeleton height="24px" className="w-full"></Skeleton>
                  <Skeleton
                    height="24px"
                    width="24px"
                    className="w-full"
                  ></Skeleton>
                  <Skeleton
                    height="24px"
                    width="60px"
                    className="w-full"
                  ></Skeleton>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="w-full">
            <Swiper slidesPerView={6.5} spaceBetween={20}>
              {dailyForecastsNext24h?.map((item: any) => {
                const time = new Date(item.dt_txt).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <SwiperSlide
                    key={item.dt}
                    className=" !w-[120px] rounded-xl bg-white shadow p-2 text-center  border border-gray-200"
                  >
                    <div className="text-sm text-gray-600">{time}</div>
                    <div className="w-full flex justify-center">
                      <Image
                        src={getWeatherIcon(item?.weather?.[0]?.main)}
                        alt={""}
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="text-md font-medium">
                      {Math.round(item.main.temp)}°C
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="flex gap-4 overflow-y-auto">
            {dailyForecasts?.map((item: any) => {
              const date = new Date(item.dt_txt).toLocaleDateString("en-EN", {
                weekday: "short",
                day: "2-digit",
                month: "2-digit",
              });

              return (
                <div
                  key={item.dt}
                  className="!w-[120px] bg-white p-3 gap-1 flex flex-col justify-center item-center text-center rounded-xl shadow border border-gray-200"
                >
                  <div className="text-sm text-gray-600">{date}</div>
                  <div className="w-full flex justify-center">
                    <Image
                      src={getWeatherIcon(item?.weather?.[0]?.main)}
                      alt={""}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="text-sm">{item.main.temp}°C</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <Heading as="h2" size="5" weight="bold" mb="1">
        Today’s Highlights
      </Heading>
      <WeatherDashboard weather={weather} isLoading={isLoading} />
    </div>
  );
};

export default WeatherInfo;
