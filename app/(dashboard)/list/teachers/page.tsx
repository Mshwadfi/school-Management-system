import FormModal from '@/components/FormModal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { role } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = () => {
  type Teacher = {
    id: number;
    teacherId: string;
    name: string;
    email?: string;
    photo: string;
    phone: string;
    subjects: string[];
    classes: string[];
    address: string;
  };

   const teachersData = [
    {
      id: 1,
      teacherId: "1234567890",
      name: "John Doe",
      email: "john@doe.com",
      photo:
        "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
      phone: "1234567890",
      subjects: ["Math", "Geometry"],
      classes: ["1B", "2A", "3C"],
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 2,
      teacherId: "1234567890",
      name: "Jane Doe",
      email: "jane@doe.com",
      photo:
        "https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=1200",
      phone: "1234567890",
      subjects: ["Physics", "Chemistry"],
      classes: ["5A", "4B", "3C"],
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 3,
      teacherId: "1234567890",
      name: "Mike Geller",
      email: "mike@geller.com",
      photo:
        "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1200",
      phone: "1234567890",
      subjects: ["Biology"],
      classes: ["5A", "4B", "3C"],
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 4,
      teacherId: "1234567890",
      name: "Jay French",
      email: "jay@gmail.com",
      photo:
        "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
      phone: "1234567890",
      subjects: ["History"],
      classes: ["5A", "4B", "3C"],
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 5,
      teacherId: "1234567890",
      name: "Jane Smith",
      email: "jane@gmail.com",
      photo:
        "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1200",
      phone: "1234567890",
      subjects: ["Music", "History"],
      classes: ["5A", "4B", "3C"],
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 6,
      teacherId: "1234567890",
      name: "Anna Santiago",
      email: "anna@gmail.com",
      photo:
        "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
      phone: "1234567890",
      subjects: ["Physics"],
      classes: ["5A", "4B", "3C"],
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 7,
      teacherId: "1234567890",
      name: "Allen Black",
      email: "allen@black.com",
      photo:
        "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1200",
      phone: "1234567890",
      subjects: ["English", "Spanish"],
      classes: ["5A", "4B", "3C"],
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 8,
      teacherId: "1234567890",
      name: "Ophelia Castro",
      email: "ophelia@castro.com",
      photo:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1200",
      phone: "1234567890",
      subjects: ["Math", "Geometry"],
      classes: ["5A", "4B", "3C"],
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 9,
      teacherId: "1234567890",
      name: "Derek Briggs",
      email: "derek@briggs.com",
      photo:
        "https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1200",
      phone: "1234567890",
      subjects: ["Literature", "English"],
      classes: ["5A", "4B", "3C"],
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 10,
      teacherId: "1234567890",
      name: "John Glover",
      email: "john@glover.com",
      photo:
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1200",
      phone: "1234567890",
      subjects: ["Biology"],
      classes: ["5A", "4B", "3C"],
      address: "123 Main St, Anytown, USA",
    },
  ];

  const columns = [
    {
      header: 'Info',
      accessor: 'info',
    },
    {
      header: 'Teacher ID',
      accessor: 'teacherId',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Subjects',
      accessor: 'subjects',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Classes',
      accessor: 'classes',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Phone',
      accessor: 'phone',
      className: 'hidden lg:table-cell',
    },
    {
      header: 'Address',
      accessor: 'address',
      className: 'hidden lg:table-cell',
    },
    {
      header: 'Actions',
      accessor: 'action',
    },
  ];

  const customTableRow = (item: Teacher) => (
    <tr key={item.id} className="bg-white odd:bg-slate-50 hover:bg-YellowLight transition duration-150">
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className=" xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="px-5 py-3 hidden md:table-cell">{item.teacherId}</td>
      <td className="px-5 py-3 hidden md:table-cell">{item.subjects.join(', ')}</td>
      <td className="px-5 py-3 hidden md:table-cell">{item.classes.join(', ')}</td>
      <td className="px-5 py-3 hidden lg:table-cell">{item.phone}</td>
      <td className="px-5 py-3 hidden lg:table-cell">{item.address}</td>
      <td className="px-5 py-3">
      <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
            {
              role === 'admin' && <FormModal table='teacher' type='delete' id={item.id} />
            }
          
        </div>
      </td>
    </tr>
  );
  

  return (
    <div className="m-2 bg-white p-6 rounded-md flex-1">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Yellow hover:bg-yellow-300">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Yellow hover:bg-yellow-300">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {
              role === 'admin'&& <FormModal table="teacher" type="create"/>
            }
          </div>
        </div>
      </div>
      <Table columns={columns} customTableRow={customTableRow} data={teachersData} />
      <Pagination />
    </div>
  );
};

export default page;
