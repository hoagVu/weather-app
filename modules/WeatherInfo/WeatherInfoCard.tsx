import { Card, Text } from "@radix-ui/themes";
import * as React from "react";

interface IWeatherInfoCardProps {
  title: string;
  children: React.ReactNode;
}

const WeatherInfoCard: React.FunctionComponent<IWeatherInfoCardProps> = ({
  title,
  children,
}) => {
  return (
    <Card className="p-4 h-full w-full shadow">
      <Text as="div" className="text-gray-500 !mb-1">
        {title}
      </Text>
      {children}
    </Card>
  );
};

export default WeatherInfoCard;
