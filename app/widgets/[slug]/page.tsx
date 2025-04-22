"use client";
import WeatherInfo from "@/modules/WeatherInfo/WeatherInfo";
import { notFound } from "next/navigation";
import { use } from "react";

export default function WidgetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params as any) as any;

  // Optionally: Fetch data từ slug
  // const data = getWidgetData(slug) || null;

  if (!slug) return notFound();

  return (
    <div className="h-full">
      <WeatherInfo id={slug} />
    </div>
  );
}
