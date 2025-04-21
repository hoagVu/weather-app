import { WindInfo } from "./@types/weather";

export function mpsToKmh(speed: number): number {
  return +(speed * 3.6).toFixed(1); // rounded to 1 decimal
}

export function degToDirection(deg: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

export function formatWind({ speed, deg, gust }: WindInfo): {
  speed: number;
  direction: string;
  gustText: string;
} {
  const speedKmh = mpsToKmh(speed);
  const direction = degToDirection(deg);
  const gustText = gust ? ` (gust ${mpsToKmh(gust)} km/h)` : "";
  return { speed: speedKmh, direction, gustText };
}

export function formatDayTime(unix: number, locale = "en-US") {
  const date = new Date(unix * 1000);

  const day = date.toLocaleDateString(locale, { weekday: "long" });
  const time = date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${day}, ${time}`;
}

function capitalize(text: string) {
  return text?.charAt(0)?.toUpperCase() + text?.slice(1)?.toLowerCase();
}

export function capitalizeWords(text: string) {
  return text
    ?.split(" ")
    ?.map((word) => capitalize(word))
    ?.join(" ");
}

export function getFeelsLikeEmoji(temp: number): string {
  if (temp >= 40) return "🔥"; // Rất nóng, cháy da
  if (temp >= 30) return "🥵"; // Nóng bức
  if (temp >= 22) return "😊"; // Ấm áp dễ chịu
  if (temp >= 15) return "😌"; // Mát mẻ
  if (temp >= 5) return "🧥"; // Lạnh vừa, cần áo khoác
  if (temp >= -5) return "🥶"; // Lạnh run
  return "❄️"; // Rét buốt, băng giá
}
