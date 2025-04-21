import { Card, Text } from "@radix-ui/themes";
import * as React from "react";

interface IWeatherInfoProps {
  title: string;
  children: React.ReactNode;
}

const WeatherInfo: React.FunctionComponent<IWeatherInfoProps> = ({
  title,
  children,
}) => {
  return (
    <Card className="p-4 min-h-[100px]">
      <Text as="div" className="text-gray-500 !mb-1">
        {title}
      </Text>
      {children}
    </Card>
  );
};

export default WeatherInfo;
