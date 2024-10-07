import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex h-screen"
        >
         <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
            <Link href={'/'} className="flex items-center justify-center lg:justify-start gap-2">
                <Image src={'/logo.png'} width={32} height={32} alt="logo"/>
                <span className="hidden md:block">School</span>
            </Link>
            <Menu />
         </div>
         <div className="bg-slate-400 w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
            right
            {/* navbar */}
            
            {children}
         </div>
        </div>
    );
  }
  