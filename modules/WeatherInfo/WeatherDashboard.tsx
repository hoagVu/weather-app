import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import WeatherInfoCard from "./WeatherInfoCard";
import Image from "next/image";
import { Skeleton } from "@radix-ui/themes";
import windlImg from "@/assets/air-flow.png";
import compassImg from "@/assets/compass.png";
import eyeImg from "@/assets/eye.png";
import humidityImg from "@/assets/humidity.png";
import pressureImg from "@/assets/pressure-gauge.png";
import sealevelImg from "@/assets/sea-level.png";
import sunriseImg from "@/assets/sunrise.png";
import sunsetImg from "@/assets/sunset.png";
import { formatWind } from "@/utils/helper";

const initialItems = [
  "visibility",
  "sunriseSunset",
  "seaLevel",
  "pressure",
  "wind",
  "humidity",
];

export default function WeatherDashboard({
  weather,
  isLoading,
}: {
  weather: { [key: string]: any };
  isLoading?: boolean;
}) {
  const [items, setItems] = React.useState(initialItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // delay để tránh conflict với scroll
        tolerance: 5,
      },
    })
  );
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const itemsContent: any = (
    weather: { [key: string]: any },
    isLoading?: boolean
  ) => {
    const sunriseTime = new Date(
      weather?.sys?.sunrise * 1000
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const sunsetTime = new Date(weather?.sys?.sunset * 1000).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    const display: any = weather?.wind ? formatWind(weather?.wind) : {};
    return {
      visibility: (
        <WeatherInfoCard title="Visibility">
          <div className="h-fit flex flex-col justify-center items-center gap-3">
            <Image src={eyeImg} alt="" height={64} width={64} />
            <Skeleton loading={isLoading}>
              <div className="text-2xl font-bold">{`${
                weather?.visibility / 1000
              }km`}</div>
            </Skeleton>
          </div>
        </WeatherInfoCard>
      ),
      sunriseSunset: (
        <WeatherInfoCard title="Sunrise & Sunset">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <Image src={sunriseImg} alt="" height={56} width={56} />
              <Skeleton loading={isLoading}>
                <div className="mt-4 font-bold">{sunriseTime}</div>
              </Skeleton>
            </div>
            <div className="flex gap-2 items-center">
              <Image src={sunsetImg} alt="" height={56} width={56} />
              <Skeleton loading={isLoading}>
                <div className="mt-4 font-bold">{sunsetTime}</div>
              </Skeleton>
            </div>
          </div>
        </WeatherInfoCard>
      ),
      seaLevel: (
        <WeatherInfoCard title="Sea level">
          <div className="h-fit flex flex-col justify-center items-center gap-3">
            <Image src={sealevelImg} alt="" height={64} width={64} />
            <Skeleton loading={isLoading}>
              <div className="text-2xl font-bold">{`${weather?.main?.sea_level}hPa`}</div>
            </Skeleton>
          </div>
        </WeatherInfoCard>
      ),
      pressure: (
        <WeatherInfoCard title="Pressure">
          <div className="h-fit flex flex-col justify-center items-center gap-3">
            <Image src={pressureImg} alt="" height={64} width={64} />
            <Skeleton loading={isLoading}>
              <div className="text-2xl font-bold">{`${weather?.main?.pressure}hPa`}</div>
            </Skeleton>
          </div>
        </WeatherInfoCard>
      ),
      wind: (
        <WeatherInfoCard title="Wind">
          <div className="flex flex-col gap-2 justify-between items-start">
            <div className="flex gap-2 items-center">
              <Image
                src={windlImg}
                alt=""
                className="h-[56px] w-[56px] lg:h-[48px] lg:w-[48px]"
              />
              <Skeleton loading={isLoading}>
                <div className="text-xl font-bold max-w-[120px]">{`${display?.speed}km/h`}</div>
              </Skeleton>
            </div>
            <div className="text-[16px] lg:text-xl flex justify-start w-full items-center lg:pl-1">
              <Image
                src={compassImg}
                alt=""
                className="h-[20px] w-[20px] lg:h-[28px] lg:w-[28px]"
              />
              <strong className="ml-1">{display?.direction}</strong>&nbsp;
              <span className="text-[14px] lg:text-[16px] whitespace-nowrap">
                {display?.gustText && `${display?.gustText}`}
              </span>
            </div>
          </div>
        </WeatherInfoCard>
      ),
      humidity: (
        <WeatherInfoCard title="Humidity">
          <div className="h-fit flex flex-col justify-center items-center gap-3 w-full">
            <Image src={humidityImg} alt="" height={64} width={64} />
            <Skeleton loading={isLoading}>
              <div className="text-2xl font-bold">{`${weather?.main?.humidity}%`}</div>
            </Skeleton>
          </div>
        </WeatherInfoCard>
      ),
    };
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((id) => (
            <SortableItem key={id} id={id}>
              {itemsContent(weather, isLoading)?.[`${id}`]}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
