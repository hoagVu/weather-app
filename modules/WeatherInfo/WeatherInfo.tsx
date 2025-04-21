import { Card, Heading, Text } from "@radix-ui/themes";
import * as React from "react";

type IWeatherInfoProps = object;

const WeatherInfo: React.FunctionComponent<IWeatherInfoProps> = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <Card
            key={idx}
            className="p-4 flex flex-col text-center min-w-[80px]"
          >
            <Text>{day}</Text>
            <Text size="2">☀️ 15° - 3°</Text>
          </Card>
        ))}
      </div>

      <Heading as="h2" size="5" weight="bold" mb="3">
        Today’s Highlights
      </Heading>
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <Text>UV Index: 5</Text>
        </Card>
        <Card className="p-4">
          <Text>Wind: 7.70 km/h</Text>
        </Card>
        <Card className="p-4">
          <Text>Sunrise: 6:35 AM</Text>
        </Card>
        <Card className="p-4">
          <Text>Humidity: 12%</Text>
        </Card>
        <Card className="p-4">
          <Text>Visibility: 5.2 km</Text>
        </Card>
        <Card className="p-4">
          <Text>Air Quality: 105</Text>
        </Card>
      </div>
    </div>
  );
};

export default WeatherInfo;
