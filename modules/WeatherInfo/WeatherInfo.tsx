import { Card, Heading, Text } from "@radix-ui/themes";
import * as React from "react";
import WeatherInfoCard from "./WeatherInfoCard";
import Image from "next/image";
import sunriseImg from "@/assets/sunrise.png";
import sunsetImg from "@/assets/sunset.png";
import sealevelImg from "@/assets/sea-level.png";
import windlImg from "@/assets/air-flow.png";
import humidityImg from "@/assets/humidity.png";
import pressureImg from "@/assets/pressure-gauge.png";
import eyeImg from "@/assets/eye.png";

import { formatWind } from "@/utils/helper";

interface IWeatherInfoProps {
  weather: { [key: string]: any };
  isLoading?: boolean;
}

const WeatherInfo: React.FunctionComponent<IWeatherInfoProps> = ({
  weather,
  isLoading,
}) => {
  const sunriseTime = new Date(weather?.sys?.sunrise * 1000).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const sunsetTime = new Date(weather?.sys?.sunset * 1000).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  const display: any = weather?.wind ? formatWind(weather?.wind) : {};
  console.log("display", display);
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
        <WeatherInfoCard title="Visibility">
          <div className="h-fit flex flex-col justify-center items-center gap-3 pt-3">
            <Image src={eyeImg} alt="" height={64} width={64} />{" "}
            <div className="text-2xl font-bold">{`${
              weather?.visibility / 1000
            }km`}</div>
          </div>
        </WeatherInfoCard>
        <WeatherInfoCard title="Sunrise & Sunset">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <Image src={sunriseImg} alt="" height={56} width={56} />
              <div className="mt-4 font-bold">{sunriseTime}</div>
            </div>
            <div className="flex gap-2 items-center">
              <Image src={sunsetImg} alt="" height={56} width={56} />
              <div className="mt-4 font-bold">{sunsetTime}</div>
            </div>
          </div>
        </WeatherInfoCard>
        <WeatherInfoCard title="Sea level">
          <div className="h-fit flex flex-col justify-center items-center gap-3 pt-3">
            <Image src={sealevelImg} alt="" height={64} width={64} />{" "}
            <div className="text-2xl font-bold">{`${weather?.main?.sea_level}hPa`}</div>
          </div>
        </WeatherInfoCard>{" "}
        <WeatherInfoCard title="Pressure">
          <div className="h-fit flex flex-col justify-center items-center gap-3 pt-3">
            <Image src={pressureImg} alt="" height={64} width={64} />{" "}
            <div className="text-2xl font-bold">{`${weather?.main?.pressure}hPa`}</div>
          </div>
        </WeatherInfoCard>
        <WeatherInfoCard title="Wind">
          <div className="flex flex-col gap-2 justify-between items-center">
            <div className="flex gap-2 items-center pt-3">
              <Image src={windlImg} alt="" height={56} width={56} />{" "}
              <div className="text-2xl font-bold">{`${display?.speed}km/h`}</div>
            </div>
            <div className="text-xl pt-3 flex justify-start w-full pl-4">
              <strong>{display?.direction}</strong>
              &nbsp;
              <span className="text-lg">
                {display?.gustText && `${display?.gustText}`}
              </span>
            </div>{" "}
          </div>
        </WeatherInfoCard>{" "}
        <WeatherInfoCard title="Humidity">
          <div className="h-fit flex flex-col justify-center items-center gap-3 pt-3">
            <Image src={humidityImg} alt="" height={64} width={64} />{" "}
            <div className="text-2xl font-bold">{`${weather?.main?.humidity}%`}</div>
          </div>
        </WeatherInfoCard>
      </div>
    </div>
  );
};

export default WeatherInfo;
