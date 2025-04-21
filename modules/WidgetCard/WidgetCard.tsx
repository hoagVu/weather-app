import { Cross1Icon, Crosshair2Icon } from "@radix-ui/react-icons";
import { Card, IconButton, Skeleton, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface IWidgetCardProps {
  temp: string | number;
  description: string;
  humidity: string | number;
  windSpeed: string | number;
  location: string;
  icon: string;
  id: number;
  loading?: boolean;
}

const WidgetCard: React.FunctionComponent<IWidgetCardProps> = ({
  temp,
  description,
  humidity,
  windSpeed,
  location,
  icon,
  id,
  loading,
}) => {
  return (
    <Link href={`/widgets/${id}`}>
      <Card className="hover:bg-blue-100 w-full h-full bg-white shadow rounded cursor-pointer relative">
        <div className="flex items-center gap-2">
          <Skeleton width={"32px"} height={"32px"} loading={loading}>
            <Image
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
              width={32}
              height={32}
              className="max-w-[32px] max-h-[32px]"
              layout="intrinsic"
            />
          </Skeleton>

          <Skeleton height={"32px"} loading={loading}>
            <Text size="3" weight="bold" className="w-full">
              {location}
            </Text>
          </Skeleton>
        </div>
        <p>Temperature: {temp}°C</p>
        <p>Condition: {description}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind: {windSpeed} m/s</p>
        <div
          className="absolute top-2 right-2 rounded-full bg-blue-50 w-[20px] h-[20px] flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <Cross1Icon height="14" width="14" />
        </div>
      </Card>
    </Link>
  );
};

export default WidgetCard;
