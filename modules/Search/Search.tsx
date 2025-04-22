"use client";

import { useAppContext } from "@/context/AppContext";
import { VN_COUNTRY } from "@/utils/constant";
import { Crosshair2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import clsx from "clsx";
import Fuse from "fuse.js";
import * as React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Search.module.css";
import { useWeatherById } from "@/hooks/useWeatherById";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import WidgetCard from "../WidgetCard/WidgetCard";
import { useRouter } from "next/navigation";
import GeoButton from "./GeoButton";
import WeatherOverview from "../WeatherInfo/WeatherOverview";

type ISearchProps = object;

const Search: React.FunctionComponent<ISearchProps> = () => {
  const [searchText, setSearchText] = React.useState("");

  const [valueSelected, setValueSelected] = React.useState<any>(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { push } = useRouter();

  const { setCurrentCityId, setWidgets, widgets } = useAppContext();

  const { weather } = useWeatherById(valueSelected?.id);

  const handleChange = (e: any) => {
    setSearchText(e?.target?.value);
  };

  const onItemClick = (item: any) => {
    setValueSelected(item);
    setSearchText(item.name);
  };

  const results = React.useMemo(() => {
    const filterWidgets = VN_COUNTRY.filter(
      (aItem) => !widgets.some((bItem) => bItem.id === aItem.id)
    );

    const fuse = new Fuse(filterWidgets || [], {
      useExtendedSearch: true,
      keys: ["id", "name"],
    });
    return searchText === ""
      ? filterWidgets
      : fuse?.search(searchText)?.map((item) => item?.item);
  }, [searchText, widgets]);

  return (
    <>
      <div ref={containerRef} className="relative w-full">
        <Dialog.Root open={!!valueSelected}>
          <Dialog.Trigger>
            <div>
              <TextField.Root
                radius="full"
                placeholder="Search the docs…"
                size="3"
                value={searchText}
                onChange={handleChange}
                onFocus={() => setShowDropdown(true)}
                onClick={() => setShowDropdown(true)}
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
                <TextField.Slot pr="3">
                  <GeoButton />
                </TextField.Slot>
              </TextField.Root>
            </div>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="800px" className="overflow-auto">
            <div className="flex flex-col gap-4 w-full">
              <WidgetCard
                location={weather?.name}
                temp={weather?.main?.temp}
                humidity={weather?.main?.humidity}
                windSpeed={weather?.wind?.speed}
                description={weather?.weather[0]?.description}
                main={weather?.weather[0]?.main}
                id={weather?.id}
                loading={!weather}
                canRemove={weather?.list?.length > 1}
                cancelRedirect
              ></WidgetCard>
              <WeatherInfo
                id={valueSelected?.id}
                className="hidden lg:flex max-h-[400px] overflow-auto pr-4"
              />
            </div>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button
                  variant="soft"
                  color="gray"
                  asChild
                  onClick={() => setValueSelected(null)}
                >
                  <span className="cursor-pointer">Cancel</span>
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button
                  onClick={() => {
                    setValueSelected(null);
                    setSearchText("");
                    setCurrentCityId(valueSelected.id);
                    setWidgets([...widgets, valueSelected]);
                    push("/widgets");
                  }}
                >
                  Add
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>

        <OutsideClickHandler
          onOutsideClick={() => {
            setShowDropdown(false);
          }}
        >
          {showDropdown && (
            <div
              className={clsx(
                "absolute z-10 mt-1 w-full bg-white rounded-md shadow-xl max-h-[300px] overflow-auto",
                styles.popoverContent
              )}
            >
              {results.length === 0 ? (
                <div className="px-3 py-2 text-gray-500">Not Found</div>
              ) : (
                results.map((item) => (
                  <div
                    key={item.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onItemClick(item);
                      setShowDropdown(false);
                    }}
                  >
                    {item.name}
                  </div>
                ))
              )}
            </div>
          )}
        </OutsideClickHandler>
      </div>
    </>
  );
};

export default Search;
