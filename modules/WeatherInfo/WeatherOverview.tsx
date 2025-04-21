import { Text } from "@radix-ui/themes";
import * as React from "react";

type IWeatherOverviewProps = object;

const WeatherOverview: React.FunctionComponent<IWeatherOverviewProps> = () => {
  return (
    <div className="flex flex-col items-start gap-4 h-full">
      <Text size="6" weight="bold">
        12°C
      </Text>
      <Text>Monday, 16:00</Text>
      <Text>🌥️ Mostly Cloudy</Text>
      <Text>🌧️ Rain: 30%</Text>
      <Text className="text-sm text-slate-600">New York, NY, USA</Text>
    </div>
  );
};

export default WeatherOverview;
