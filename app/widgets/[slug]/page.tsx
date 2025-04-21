"use client";
import { useWeatherById } from "@/hooks/useWeatherById";
import WeatherInfo from "@/modules/WeatherInfo/WeatherInfo";
import { notFound } from "next/navigation";
import { use } from "react";

export default function WidgetDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = use(params as any) as any;

  const { weather, isLoading } = useWeatherById(slug);

  console.log("weatheesadasr", weather);

  // Optionally: Fetch data từ slug
  // const data = getWidgetData(slug) || null;

  if (!slug) return notFound();

  return (
    <div className="h-full">
      <WeatherInfo weather={weather || {}} isLoading={isLoading} />
    </div>
  );
}
