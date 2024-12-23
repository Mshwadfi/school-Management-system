import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/constants";
import { getUserRole } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Parent, Prisma, Student } from "@prisma/client";
import Image from "next/image";

type ParentList = Parent & { students: Student[] };

const ParentListPage = async({ searchParams }: { searchParams: { [key: string]: string  | undefined }}) => {
  
  const {page = '1', ...queryParams} = searchParams;
  const query: Prisma.ParentWhereInput = {};
  const currentPage = parseInt(page, 10) || 1; 
  const skip = ITEM_PER_PAGE * (currentPage - 1);
  const role = await getUserRole();
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
      
      const columns = [
        {
          header: "Info",
          accessor: "info",
        },
        {
          header: "Student Names",
          accessor: "students",
          className: "hidden md:table-cell",
        },
        {
          header: "Phone",
          accessor: "phone",
          className: "hidden lg:table-cell",
        },
        {
          header: "Address",
          accessor: "address",
          className: "hidden lg:table-cell",
        },
        ...(role === "admin"
          ? [
              {
                header: "Actions",
                accessor: "action",
              },
            ]
          : []),
      ];
    const [parentsData, parentsCount] = await prisma.$transaction([
      prisma.parent.findMany({
        where: query,
        include: {
          students:true,
        },
        take: ITEM_PER_PAGE,
        skip,
      }),
      prisma.parent.count({ where: query }),
    ]);
    parentsData.forEach(parent => {
      console.log('Parent:', parent);
      parent.students.forEach(student => {
        console.log('Student:', student);
      });
    });
    

 
  const customTableRow = (item: ParentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.students.map((student) => student.name).join(",")}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="parent" type="update" data={item} />
            <FormModal table="parent" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} customTableRow={customTableRow} data={parentsData} />
      {/* PAGINATION */}
      <Pagination initialPage={+(page)} count={parentsCount}/>
    </div>
  );
};

export default ParentListPage;
