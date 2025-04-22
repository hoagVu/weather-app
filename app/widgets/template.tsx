import { NavGroup } from "@/components/NavGroup";

// app/widgets/layout.tsx
export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavGroup />
      {children}
    </>
  );
}
