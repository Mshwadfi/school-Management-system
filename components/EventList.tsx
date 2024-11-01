import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  console.log("Received dateParam:", dateParam);

  let date: Date;

  if (dateParam) {
    const dateParts = dateParam.split(',');
    if (dateParts.length === 2) {
      const [day, month, year] = dateParts[1].split('-').map(Number);
      date = new Date(year, month - 1, day);
    } else {
      date = new Date();
    }
  } else {
    date = new Date(); 
  }

  if (isNaN(date.getTime())) {
    console.error("Invalid date created from dateParam:", dateParam);
    date = new Date(); 
  }

  const startTime = new Date(date.setHours(0, 0, 0, 0));
  const endTime = new Date(date.setHours(23, 59, 59, 999));

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: startTime,
        lte: endTime,
      },
    },
  });

  return data.map((event) => (
    <div
      className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-Sky even:border-t-Purple"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <span className="text-gray-300 text-xs">
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
    </div>
  ));
};

export default EventList;
