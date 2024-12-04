import SideBar from "@/components/sidebar/SideBar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between">
      <SideBar />

      <main className="grid w-full h-full pl-[300px] items-center">
        {children}
      </main>
    </div>
  );
}
