import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const classes = await prisma.class.findMany();
  const exams = await prisma.exam.findMany();
  const lessons = await prisma.lesson.findMany();
  const students = await prisma.student.findMany(); // Fetch existing students
  const assignments = await prisma.assignment.findMany();

   
  
  // RESULT
  await Promise.all(
    Array.from({ length: 10 }, async (_, i) => {
      return prisma.result.create({
        data: {
          score: Math.floor(Math.random() * 100), // Random score for demonstration
          student: { connect: { id: students[i % students.length].id } }, // Use actual student IDs
          ...(i < 5 
            ? { exam: { connect: { id: exams[i % exams.length].id } } } 
            : { assignment: { connect: { id: assignments[i % assignments.length].id } } }
          ),
        },
      });
    })
  );

  // ATTENDANCE
  await Promise.all(
    Array.from({ length: 10 }, async (_, i) => {
      return prisma.attendance.create({
        data: {
          date: new Date(),
          present: true,
          student: { connect: { id: students[i % students.length].id } }, // Use actual student IDs
          lesson: { connect: { id: lessons[i % lessons.length].id } },
        },
      });
    })
  );

  // EVENT
  await Promise.all(
    Array.from({ length: 5 }, async (_, i) => {
      return prisma.event.create({
        data: {
          title: `Event ${i + 1}`,
          description: `Description for Event ${i + 1}`,
          startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
          endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
          class: { connect: { id: classes[i % classes.length].id } },
        },
      });
    })
  );

  // ANNOUNCEMENT
  await Promise.all(
    Array.from({ length: 5 }, async (_, i) => {
      return prisma.announcement.create({
        data: {
          title: `Announcement ${i + 1}`,
          description: `Description for Announcement ${i + 1}`,
          date: new Date(),
          class: { connect: { id: classes[i % classes.length].id } },
        },
      });
    })
  );

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
