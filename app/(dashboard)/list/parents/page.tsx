import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";

type Parent = {
  id: number;
  name: string;
  phone: string;
  address: string;
  students: string[];
};
export const parentsData:Parent[] = [
  {
    id: 1,
    name: "John Doe",
    students: ["Alice Doe", "Bob Doe"],
    phone: "123-456-7890",
    address: "123 Main St, Cityville",
  },
  {
    id: 2,
    name: "Jane Smith",
    students: ["Charlie Smith"],
    phone: "234-567-8901",
    address: "456 Oak St, Townsville",
  },
  {
    id: 3,
    name: "Emily Johnson",
    students: ["David Johnson", "Eva Johnson"],
    phone: "345-678-9012",
    address: "789 Pine St, Villagetown",
  },
  {
    id: 4,
    name: "Michael Brown",
    students: ["Fiona Brown"],
    phone: "456-789-0123",
    address: "101 Maple St, Hamletown",
  },
  {
    id: 5,
    name: "Sarah Davis",
    students: ["George Davis", "Hannah Davis"],
    phone: "567-890-1234",
    address: "202 Birch St, Boroughsville",
  },
];


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
  {
    header: "Actions",
    accessor: "action",
  },
];

const ParentListPage = () => {
  const customTableRow = (item: Parent) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{/* Email can be added if needed */}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.students.join(", ")}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
      <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
              <Image src="/delete.png" alt="" width={16} height={16} />
             </button>
             <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
              <Image src="/create.png" alt="" width={16} height={16} />
             </button>
          
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
      <Pagination />
    </div>
  );
};

export default ParentListPage;
