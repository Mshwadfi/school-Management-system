import FormModal from '@/components/FormModal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { role } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = () => {
  type Student = {
    id: number;
    name: string;
    grade: string;
    phone: string;
    address: string;
  };

  const studentsData: Student[] = [
    {
      id: 1,
      name: "Alice Johnson",
      grade: "10",
      phone: "1234567890",
      address: "456 Elm St, Anytown, USA",
    },
    {
      id: 2,
      name: "Bob Smith",
      grade: "11",
      phone: "1234567890",
      address: "789 Pine St, Anytown, USA",
    },
    {
      id: 3,
      name: "Charlie Brown",
      grade: "12",
      phone: "1234567890",
      address: "101 Maple St, Anytown, USA",
    },
    {
      id: 4,
      name: "David Wilson",
      grade: "10",
      phone: "1234567890",
      address: "102 Oak St, Anytown, USA",
    },
    {
      id: 5,
      name: "Emma Davis",
      grade: "11",
      phone: "1234567890",
      address: "103 Cedar St, Anytown, USA",
    },
    {
      id: 6,
      name: "Fiona Green",
      grade: "12",
      phone: "1234567890",
      address: "104 Birch St, Anytown, USA",
    },
    {
      id: 7,
      name: "George Black",
      grade: "10",
      phone: "1234567890",
      address: "105 Walnut St, Anytown, USA",
    },
    {
      id: 8,
      name: "Hannah White",
      grade: "11",
      phone: "1234567890",
      address: "106 Spruce St, Anytown, USA",
    },
    {
      id: 9,
      name: "Ian Brown",
      grade: "12",
      phone: "1234567890",
      address: "107 Fir St, Anytown, USA",
    },
    {
      id: 10,
      name: "Jasmine Blue",
      grade: "10",
      phone: "1234567890",
      address: "108 Willow St, Anytown, USA",
    },
  ];

  const columns = [
    {
      header: 'Info',
      accessor: 'info',
    },
    {
      header: 'ID',
      accessor: 'id',
    },
    {
      header: 'Grade',
      accessor: 'grade',
    },
    {
      header: 'Phone',
      accessor: 'phone',
    },
    {
      header: 'Address',
      accessor: 'address',
    },
    {
      header: 'Actions',
      accessor: 'action',
    },
  ];

  const customTableRow = (item: Student) => (
    <tr key={item.id} className="bg-white odd:bg-slate-50 hover:bg-YellowLight transition duration-150">
      <td className="flex items-center gap-4 p-4">
        <Image
          src="https://via.placeholder.com/40" // Replace with a valid student image URL if available
          alt={item.name}
          width={40}
          height={40}
          className="xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
        </div>
      </td>
      <td className="px-5 py-3">{item.id}</td>
      <td className="px-5 py-3">{item.grade}</td>
      <td className="px-5 py-3">{item.phone}</td>
      <td className="px-5 py-3">{item.address}</td>
      <td className="px-5 py-3">
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="View" width={16} height={16} />
            </button>
          </Link>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            <Image src="/delete.png" alt="Delete" width={16} height={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="m-2 bg-white p-6 rounded-md flex-1">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
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
            role === 'admin' && <FormModal type='create' table='student' />
           }
          </div>
        </div>
      </div>
      <Table columns={columns} customTableRow={customTableRow} data={studentsData} />
      <Pagination />
    </div>
  );
};

export default page;
