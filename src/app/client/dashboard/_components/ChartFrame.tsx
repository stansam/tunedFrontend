import { ResponsiveContainer } from "recharts";

export function ChartFrame({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" minWidth={0} height="100%" minHeight={0}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}