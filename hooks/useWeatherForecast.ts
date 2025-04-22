import { API_KEY, API_URL } from "@/utils/constant";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useWeatherForecast(cityId: number | string) {
  const { data, error, isLoading } = useSWR(
    cityId
      ? `${API_URL}/data/2.5/forecast?id=${cityId}&appid=${API_KEY}&units=metric`
      : null,
    fetcher
  );

  return {
    forecast: data,
    isLoading,
    isError: error,
  };
}
