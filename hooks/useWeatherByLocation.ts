import { API_KEY, API_URL } from "@/utils/constant";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useWeatherByLocation(
  lat: number | null,
  lon: number | null
) {
  const shouldFetch = lat !== null && lon !== null;

  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? `${API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      : null,
    fetcher
  );

  return {
    weather: data,
    isLoading,
    isError: error,
  };
}
