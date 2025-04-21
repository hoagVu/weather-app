import { TabGroup } from "@/components/TabGroup";

// app/widgets/layout.tsx
export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TabGroup
        path="/widgets"
        items={[
          {
            text: "Widgets",
          },
          {
            text: "Widget Detail",
            slug: "1581130",
          },
        ]}
      />
      {children}
    </>
  );
}
