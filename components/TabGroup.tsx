import type { LinkProps } from "next/link";
import { Tab } from "./Tab";

export type Item = {
  text: string;
  slug?: string;
  segment?: string;
  prefetch?: LinkProps["prefetch"];
};

export const TabGroup = ({ path, items }: { path: string; items: Item[] }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {items.map((item) => (
        <Tab key={path + item.slug} item={item} path={path} />
      ))}
    </div>
  );
};
