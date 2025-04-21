// hooks/useWeather.ts
import { API_KEY } from "@/utils/constant";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useWeatherById(cityId: number | string) {
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${API_KEY}`;
  const { data, error, isLoading } = useSWR(cityId ? url : null, fetcher);

  return {
    weather: data,
    isLoading,
    isError: error,
  };
}
