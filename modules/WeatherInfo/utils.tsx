import clearSky from "@/assets/clear-sky.png";
import clouds from "@/assets/clouds.png";
import drizzle from "@/assets/drizzle.png";
import thunderstorm from "@/assets/thunderstorm.png";
import snowman from "@/assets/snowman.png";
import fog from "@/assets/fog.png";
import smoke from "@/assets/smoke.png";
import eye from "@/assets/eye.png";
import airFlow from "@/assets/air-flow.png";
import { StaticImageData } from "next/image";

const weatherIconMap: Record<string, StaticImageData> = {
  Clear: clearSky,
  Clouds: clouds,
  Rain: airFlow,
  Drizzle: drizzle,
  Thunderstorm: thunderstorm,
  Snow: snowman,
  Mist: fog,
  Fog: fog,
  Haze: smoke,
  Smoke: smoke,
  Dust: fog,
  Sand: fog,
  Ash: fog,
  Squall: airFlow,
  Tornado: eye,
};

export function getWeatherIcon(main: string): StaticImageData {
  return weatherIconMap[main] || eye;
}
