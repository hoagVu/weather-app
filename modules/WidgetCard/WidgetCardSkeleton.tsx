import { Card, Skeleton } from "@radix-ui/themes";
import * as React from "react";

const WidgetCardSkeleton: React.FunctionComponent = () => {
  return (
    <Card className="flex flex-col gap-1 w-full h-full bg-white shadow rounded cursor-pointer">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <Skeleton width="32px" height="32px"></Skeleton>
          <Skeleton height="32px" className="w-full"></Skeleton>
        </div>
        <div className="flex w-full gap-1 items-center">
          Temperature:
          <Skeleton height="32px" className="w-full"></Skeleton>°C
        </div>
        <div className="flex w-full gap-1 items-center">
          Condition:
          <Skeleton height="32px" className="w-full"></Skeleton>°C
        </div>
        <div className="flex w-full gap-1 items-center">
          Humidity:
          <Skeleton height="32px" className="w-full"></Skeleton>°C
        </div>
        <div className="flex w-full gap-1 items-center">
          Wind:
          <Skeleton height="32px" className="w-full"></Skeleton>°C
        </div>
      </div>
    </Card>
  );
};

export default WidgetCardSkeleton;
