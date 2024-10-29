import FormModal from '@/components/FormModal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { ITEM_PER_PAGE } from '@/lib/constants';
import { role } from '@/lib/data';
import prisma from '@/lib/prisma';
import { Class, Prisma, Subject, Teacher } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


type TeacherList = Teacher & {subjects:Subject[]} & {classes:Class[]};


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
  const page = async ({ searchParams }: { searchParams: { [key: string]: string } | undefined }) => {
    const { page = '1', ...queryParams } = searchParams || {}; 
    const query: Prisma.TeacherWhereInput = {};
  
    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case 'classId':
              query.lessons = {
                some: {
                  classId: value,
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
  
    const currentPage = parseInt(page, 10) || 1; 
    const skip = ITEM_PER_PAGE * (currentPage - 1); 
  
    const [teachers, teachersCount] = await prisma.$transaction([
      prisma.teacher.findMany({
        where: query,
        include: {
          teacherSubjects: {
            include: {
              subject: true,
            },
          },
          teacherClasses: {
            include: {
              class: true,
            },
          },
        },
        take: ITEM_PER_PAGE,
        skip, 
      }),
      prisma.teacher.count({ where: query }),
    ]);
  
    const teachersData = teachers.map((teacher) => ({
      ...teacher,
      classes: teacher.teacherClasses.map((tc) => tc.class.name), 
      subjects: teacher.teacherSubjects.map((ts) => ts.subject.name), 
    }));
  
    console.log(teachersData);
    console.log(searchParams, 'page');
    console.log(query, 'query')
  
    const customTableRow = (item: TeacherList) => (
      <tr key={item.id} className="bg-white odd:bg-slate-50 hover:bg-YellowLight transition duration-150">
        <td className="flex items-center gap-4 p-4">
          <Image
            src={item.img || 'https://images.pexels.com/photos/14940646/pexels-photo-14940646.jpeg?auto=compress&cs=tinysrgb&w=300'}
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
        <td className="px-5 py-3 hidden md:table-cell">{item?.id}</td>
        <td className="px-5 py-3 hidden md:table-cell">{item?.subjects?.join(', ')}</td>
        <td className="px-5 py-3 hidden md:table-cell">{item?.classes?.join(', ')}</td>
        <td className="px-5 py-3 hidden lg:table-cell">{item?.phone}</td>
        <td className="px-5 py-3 hidden lg:table-cell">{item?.address}</td>
        <td className="px-5 py-3">
          <div className="flex items-center gap-2">
            <Link href={`/list/teachers/${item.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                <Image src="/view.png" alt="" width={16} height={16} />
              </button>
            </Link>
            {role === 'admin' && <FormModal table="teacher" type="delete" id={item?.id} />}
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
              {role === 'admin' && <FormModal table="teacher" type="create" />}
            </div>
          </div>
        </div>
        <Table columns={columns} customTableRow={customTableRow} data={teachersData} />
        <Pagination initialPage={+(page)} count={teachersCount} />
      </div>
    );
  };
  
  export default page;
  