import { Cross1Icon } from "@radix-ui/react-icons";
import { Card, Skeleton, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { getWeatherIcon } from "../WeatherInfo/utils";
import { capitalizeWords } from "@/utils/helper";
import clsx from "clsx";
import { useAppContext } from "@/context/AppContext";

interface IWidgetCardProps {
  temp: string | number;
  description: string;
  humidity: string | number;
  windSpeed: string | number;
  location: string;
  main: string;
  id: number;
  loading?: boolean;
  isActive?: boolean;
  canRemove?: boolean;
}

const WidgetCard: React.FunctionComponent<IWidgetCardProps> = ({
  temp,
  description,
  humidity,
  windSpeed,
  location,
  main,
  id,
  loading,
  isActive,
  canRemove,
}) => {
  const { setWidgets, widgets, setCurrentCityId } = useAppContext();

  return (
    <Link href={`/widgets/${id}`}>
      <Card
        className={clsx(
          "hover:bg-blue-100 w-full h-full bg-white shadow rounded cursor-pointer relative",
          {
            "!bg-blue-200": isActive,
          }
        )}
      >
        <div className="flex items-center gap-2">
          <Skeleton width={"32px"} height={"32px"} loading={loading}>
            <Image
              src={getWeatherIcon(main)}
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
        <p>Condition: {capitalizeWords(description)}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind: {windSpeed} m/s</p>
        {canRemove && (
          <div
            className="absolute top-2 right-2 rounded-full bg-blue-50 w-[20px] h-[20px] flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setWidgets(widgets.filter((elm) => elm.id !== id));
              setCurrentCityId(widgets[0].id);
            }}
          >
            <Cross1Icon height="14" width="14" />
          </div>
        )}
      </Card>
    </Link>
  );
};

export default WidgetCard;
