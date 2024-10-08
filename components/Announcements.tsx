const announcements = [
  {
    title: "School Closure on Holidays",
    date: "2024-10-15",
    description:
      "Please be informed that the school will be closed from October 20th to 23rd for the upcoming holidays. Classes will resume on October 24th.",
    bgColor: "bg-SkyLight",
  },
  {
    title: "Parent-Teacher Meetings",
    date: "2024-10-01",
    description:
      "Parent-Teacher meetings will be held on October 5th from 5 PM to 7 PM. We encourage all parents to attend and discuss their child’s progress with the teachers.",
    bgColor: "bg-PurpleLight",
  },
  {
    title: "Upcoming School Events",
    date: "2024-10-10",
    description:
      "Mark your calendars for the annual Science Fair on November 15th! Students are encouraged to participate and showcase their projects.",
    bgColor: "bg-YellowLight",
  },
];

const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400 cursor-pointer hover:underline">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcements.map((announcement, index) => (
          <div key={index} className={`${announcement.bgColor} rounded-md p-4`}>
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{announcement.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {announcement.date}
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
