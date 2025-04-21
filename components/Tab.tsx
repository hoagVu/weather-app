"use client";

import clsx from "clsx";
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { Item } from "./TabGroup";

export const Tab = ({ path, item }: { path: string; item: Item }) => {
  const href = item.slug ? `${path}/${item.slug}` : path;

  return (
    <Link href={href} prefetch={item.prefetch} className="text-sm font-medium">
      <TabContent href={href}>{item.text}</TabContent>
    </Link>
  );
};

// Note: We create an additional component because useLinkStatus should be
// called from a component that is rendered inside a `<Link>`
function TabContent({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const { pending: isPending } = useLinkStatus();

  return (
    <span
      className={clsx("flex transition duration-75 pb-1", {
        " text-black hover:text-blue-500 ": !isActive && !isPending,
        "border-b border-b-blue-600 text-blue-500": isActive,
        "bg-blue-200 text-gray-500 delay-75": isPending,
      })}
    >
      {children}
    </span>
  );
}
