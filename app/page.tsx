// app/page.tsx
"use client";

import { Crosshair2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Card, IconButton, Text, TextField } from "@radix-ui/themes";

export default function Home() {
  return (
    <main className="w-full h-full p-8 bg-slate-50 lg:border lg:border-gray-100 max-w-[1240px] lg:rounded-xl">
      <div className="grid grid-cols-12 h-full w-full">
        <div className="col-span-4 flex flex-col border-r pr-8 gap-4">
          <TextField.Root radius="full" placeholder="Search the docs…" size="3">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Slot pr="3">
              <IconButton size="2" variant="ghost">
                <Crosshair2Icon height="16" width="16" />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
          <Card className="p-6 flex flex-col items-center gap-4 h-fit">
            <Text size="6" weight="bold">
              12°C
            </Text>
            <Text>Monday, 16:00</Text>
            <Text>🌥️ Mostly Cloudy</Text>
            <Text>🌧️ Rain: 30%</Text>
            <Text className="text-sm text-slate-600">New York, NY, USA</Text>
          </Card>
        </div>

        <div className="col-span-8 flex flex-col pl-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, idx) => (
                  <Card key={idx} className="p-4 text-center min-w-[80px]">
                    <Text>{day}</Text>
                    <Text size="2">☀️ 15° - 3°</Text>
                  </Card>
                )
              )}
            </div>

            <div>
              <Text as="h2" size="5" weight="bold" mb="3">
                Today’s Highlights
              </Text>
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
          </div>
        </div>
      </div>
    </main>
  );
}
