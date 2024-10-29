import FormModal from '@/components/FormModal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { ITEM_PER_PAGE } from '@/lib/constants';
import { getUserRole } from '@/lib/data';
import prisma from '@/lib/prisma';
import { Class, Prisma, Student } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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

type studentList = Student & {class: Class};

const page = async({ searchParams }: { searchParams: { [key: string]: string  | undefined }}) => {
  
  const {page = '1', ...queryParams} = searchParams;
  const query: Prisma.StudentWhereInput = {};
  const currentPage = parseInt(page, 10) || 1; 
  const skip = ITEM_PER_PAGE * (currentPage - 1); 
  const role = await getUserRole();

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                },
              },
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [studentsData, studentsCount] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip,
    }),
    prisma.student.count({ where: query }),
  ]);

  const customTableRow = (item: studentList) => (
    <tr key={item.id} className="bg-white odd:bg-slate-50 hover:bg-YellowLight transition duration-150">
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || ''}
          alt={item.name}
          width={40}
          height={40}
          className="xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
        </div>
      </td>
      <td className="px-5 py-3">{item.username}</td>
      <td className="px-5 py-3">{item.name}</td>
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
      <Pagination initialPage={+(page)} count={studentsCount}/>
    </div>
  );
};

export default page;
