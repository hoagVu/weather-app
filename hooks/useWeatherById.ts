// hooks/useWeather.ts
import { API_KEY, API_URL } from "@/utils/constant";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useWeatherById(cityId: number | string) {
  const url = `${API_URL}/data/2.5/weather?id=${cityId}&units=metric&appid=${API_KEY}`;
  const { data, error, isLoading } = useSWR(cityId ? url : null, fetcher, {
    refreshInterval: 60 * 1000,
  });

  return {
    weather: data,
    isLoading,
    isError: error,
  };
}
