export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex h-screen"
        >
         <div className="bg-slate-100 w-2/6 md:w-1/6 lg:w-2/6">
            side Menu
         </div>
         <div className="bg-slate-400 w-4/6 md:w-5/6 lg:w-4/6">
            right
            {/* navbar */}
            {children}
         </div>
        </div>
    );
  }
  