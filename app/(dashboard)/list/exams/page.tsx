import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/constants";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type ExamList = Exam & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ExamListPage = async({
      searchParams,
    }: {
      searchParams: { [key: string]: string | undefined };
    }) => {


      const {page = '1', ...queryParams} = searchParams;
      const query: Prisma.ExamWhereInput = {};
      const currentPage = parseInt(page, 10) || 1; 
      const skip = ITEM_PER_PAGE * (currentPage - 1);
      query.lesson = {};
      if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
          if (value !== undefined) {
            switch (key) {
              case "classId":
                query.lesson.classId = value;
                break;
              case "teacherId":
                query.lesson.teacherId = value;
                break;
              case "search":
                query.lesson.subject = {
                  name: { contains: value, mode: "insensitive" },
                };
                break;
              default:
                break;
            }
          }
        }
      }

      const [examsData, examsCount] = await prisma.$transaction([
        prisma.exam.findMany({
          where: query,
          include: {
            lesson: {
              select: {
                subject: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
                class: { select: { name: true } },
              },
            },
          },
          take: ITEM_PER_PAGE,
          skip,
        }),
        prisma.exam.count({ where: query }),
      ]);
      
  const renderRow = (item: ExamList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">{item.lesson.teacher.name}</td>
      <td className="hidden md:table-cell"> {new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" || role === "teacher" && (
            <>
              <FormModal table="exam" type="update" data={item} />
              <FormModal table="exam" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Yellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Yellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" || role === "teacher" && <FormModal table="exam" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} customTableRow={renderRow} data={examsData} />
      {/* PAGINATION */}
      <Pagination initialPage={+(page)} count={examsCount}/>
    </div>
  );
};

export default ExamListPage;