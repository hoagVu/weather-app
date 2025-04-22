"use client";

import { useAppContext } from "@/context/AppContext";
import useWeatherByLocation from "@/hooks/useWeatherByLocation";
import { Crosshair2Icon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function GeoButton({}: {}) {
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{
    lat: number | null;
    lon: number | null;
  }>({
    lat: null,
    lon: null,
  });

  const { push } = useRouter();

  const { weather } = useWeatherByLocation(coords.lat, coords.lon);
  const { setCurrentCityId } = useAppContext();

  const handleClick = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ định vị!");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setCoords(location);
        setLoading(false);
      },
      (err) => {
        alert("Không thể lấy vị trí: " + err.message);
        setLoading(false);
      }
    );
  };

  React.useEffect(() => {
    if (weather) {
      setCurrentCityId(weather?.id);
      push(`/widgets/${weather?.id}`);
      setCoords({
        lat: null,
        lon: null,
      });
    }
  }, [weather]);

  return (
    <IconButton
      size="2"
      variant="ghost"
      onClick={handleClick}
      loading={loading}
    >
      <Crosshair2Icon height="16" width="16" />
    </IconButton>
  );
}
