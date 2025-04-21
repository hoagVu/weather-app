"use client";

import { Crosshair2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { IconButton, TextField } from "@radix-ui/themes";
import * as React from "react";

type ISearchProps = object;

const Search: React.FunctionComponent<ISearchProps> = () => {
  return (
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
  );
};

export default Search;
