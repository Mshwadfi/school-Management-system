import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  let userId;
  let role;

  try {
    const { userId: uid, sessionClaims } = await auth();
    userId = uid;
    role = (sessionClaims?.metadata as { role?: string })?.role;
  } catch (error) {
    console.error("Authentication error:", error);
    return <div>Error fetching announcements.</div>;
  }

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const whereCondition = role !== "admin" ? {
    OR: [
      { classId: null },
      { class: roleConditions[role as keyof typeof roleConditions] || {} },
    ],
  } : undefined;

  const announcements = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: whereCondition,
  });

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400 cursor-pointer hover:underline">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcements.map((announcement, index) => (
          <div key={index} className={` rounded-md p-4 odd:bg-Sky even:bg-SkyLight`}>
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{announcement.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Date(announcement.date).toLocaleDateString()} {/* Format date as needed */}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
