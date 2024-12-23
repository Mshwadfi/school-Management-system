// import FormModal from "@/components/FormModal";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/constants";
import { getUserRole } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Class, Prisma, Teacher } from "@prisma/client";
import Image from "next/image";

type ClassList = Class & { supervisor: Teacher };

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ClassListPage = async({searchParams}:{searchParams:{[key:string]: string}}) => {

  const {page = '1' , ...queryParams} = searchParams;
  const currentPage = parseInt(page, 10) || 1; 
    const skip = ITEM_PER_PAGE * (currentPage - 1);
    const query: Prisma.ClassWhereInput = {};
    const role = await getUserRole();
    if(queryParams){
      for(const [key, value] of Object.entries(queryParams)){
        if(value !== undefined){
          switch(key){
            case "supervisorId":
              query.supervisorId = value;
              break;
            case "search":
              query.name = {contains: value, mode: "insensitive"};
              break;
            default:
              break;
          }
        }
      }
    }

    const [classesData, classesCount] = await prisma.$transaction([
      prisma.class.findMany({
        where: query,
        include: {
          supervisor: true,
        },
        take: ITEM_PER_PAGE,
        skip,
      }),
      prisma.class.count({ where: query }),
    ]);
  


  const renderRow = (item: ClassList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.name[0]}</td>
      <td className="hidden md:table-cell">{item?.supervisor?.name}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="class" type="update" data={item} />
              <FormModal table="class" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {/* {role === "admin" && <FormModal table="class" type="create" />} */}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} customTableRow={renderRow} data={classesData} />
      {/* PAGINATION */}
      <Pagination initialPage={+(page)} count={classesCount}/>
    </div>
  );
};

export default ClassListPage;