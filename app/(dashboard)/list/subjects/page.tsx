import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/constants";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Prisma, Subject, Teacher, TeacherSubject } from "@prisma/client";
import Image from "next/image";

type SubjectList = Subject & { teacherSubjects: TeacherSubject[] & {teachers: Teacher[]} };

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const SubjectListPage = async({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

  const {page = '1' , ...queryParams} = searchParams;
  const currentPage = parseInt(page, 10) || 1; 
  const skip = ITEM_PER_PAGE * (currentPage - 1);
  const query: Prisma.SubjectWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [subjectsData, subjectsCount] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: {
        teacherSubjects:{
          include: {
            teacher: true,
          }
        }
      },
      take: ITEM_PER_PAGE,
      skip,
    }),
    prisma.subject.count({ where: query }),
  ]);


  const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">
  {item.teacherSubjects.teachers?.map((teacher) => teacher.name).join(", ")}
</td>

      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="subject" type="update" data={item} />
              <FormModal table="subject" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Yellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Yellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} customTableRow={renderRow} data={subjectsData} />
      {/* PAGINATION */}
      <Pagination initialPage={+(page)} count = {subjectsCount}/>
    </div>
  );
};

export default SubjectListPage;