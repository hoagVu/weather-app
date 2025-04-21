import WeatherInfo from "@/modules/WeatherInfo/WeatherInfo";
import { notFound } from "next/navigation";

export default function WidgetDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Optionally: Fetch data từ slug
  // const data = getWidgetData(slug) || null;

  if (!slug) return notFound();

  return (
    <div className="h-full">
      <WeatherInfo />
    </div>
  );
}
