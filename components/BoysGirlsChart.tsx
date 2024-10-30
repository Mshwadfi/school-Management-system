import prisma from "@/lib/prisma";
import CountChart from "./CountChart";
import Image from "next/image";

const BoysGirlsChart = async() => {
    const boysCount = await prisma.student.count({
        where: {sex: "MALE"} 
      });
    const girlsCount = await prisma.student.count({
        where: {sex: "FEMALE"} 
      });
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
    {/* TITLE */}
    <div className="flex justify-between items-center">
      <h1 className="text-lg font-semibold">Students</h1>
      <Image src="/moreDark.png" alt="" width={20} height={20} />
    </div>
    {/* CHART */}
    <CountChart boys={boysCount} girls={girlsCount} />
    {/* BOTTOM */}
    <div className="flex justify-center gap-16">
      <div className="flex flex-col gap-1">
        <div className="w-5 h-5 bg-lamaSky rounded-full" />
        <h1 className="font-bold">{boysCount}</h1>
        <h2 className="text-xs text-gray-300">
          Boys ({Math.round((boysCount / (boysCount + girlsCount)) * 100)}%)
        </h2>
      </div>
      <div className="flex flex-col gap-1">
        <div className="w-5 h-5 bg-lamaYellow rounded-full" />
        <h1 className="font-bold">{girlsCount}</h1>
        <h2 className="text-xs text-gray-300">
          Girls ({Math.round((girlsCount / (boysCount + girlsCount)) * 100)}%)
        </h2>
      </div>
    </div>
  </div>
  )
}

export default BoysGirlsChart